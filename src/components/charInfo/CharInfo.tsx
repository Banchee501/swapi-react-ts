import { useState, useEffect, FC } from 'react';
import { Link } from 'react-router-dom';

import { setContent } from '../../utils/setContent';
import useStarWarsService from '../../services/StarWarsService';
import getIdFromUrl from '../../utils/getIdFromUrl';
import { Character, Film } from '../../utils/types';

import './charInfo.scss';

const CharInfo: FC<{ charId?: string }> = ({ charId }) => {
    const [data, setData] = useState<Character | null>(null);
    const { getCharacter, clearError, process, setProcess, getFilmTitles } = useStarWarsService();

    useEffect(() => {
        updateChar();
    }, [charId]);

    const updateChar = () => {
        if (!charId) {
            return;
        }

        const characterId = getIdFromUrl(charId);

        clearError();
        setProcess('loading');
        getCharacter(characterId)
            .then(onCharLoaded)
            .then(() => setProcess('confirmed'))
            .catch((error) => {
                console.log(error);
                setProcess('error');
            });
    };

    const onCharLoaded = async (data: Character) => {
        const filmTitles = await getFilmTitles(data.films);
        setData({ ...data, filmTitles });
    };

    const View = ({ data }: { data: Character }) => {

        const { name, height, mass, gender, filmTitles, url } = data;
        const charId = getIdFromUrl(url);

        return (
            <>
                <div className="char__basics">
                    <div>
                        <div className="char__info-name">{name}</div>
                        <div className="char__descr">
                            <p>HEIGHT: {height} cm</p>
                            <p>MASS: {mass} kg</p>
                            <p>GENDER: {gender}</p>
                        </div>
                        <div className="char__btns">
                            <Link to={`/people/${charId}`} className="button button__main">
                                <div className="inner">More Info</div>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="char__films">Films:</div>
                {filmTitles.length > 0 ? (
                    <ul className="char__films-list">
                        {filmTitles.map((film: Film, index: number) => (
                            <li key={index} className="char__films-item">
                                {film.title}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>There are no films with this character.</p>
                )}
            </>
        );
    };

    return (
        <div className="char__info">
            {setContent(process, View, { data })}
        </div>
    );
};

export default CharInfo;