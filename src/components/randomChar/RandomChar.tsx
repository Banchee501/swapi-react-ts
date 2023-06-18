import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useStarWarsService from '../../services/StarWarsService';
import { Character } from '../../utils/types';

import getIdFromUrl from '../../utils/getIdFromUrl';
import { setContent } from '../../utils/setContent';

import './randomChar.scss';

import decoration from '../../resources/img/StarWars_icon.png';

const RandomChar = () => {
    const [char, setChar] = useState<Character | null>(null);
    const { getCharacter, clearError, process, setProcess, getCount } = useStarWarsService();

    const updateChar = async () => {
        const countCharacters = await getCount('people');
        clearError();
        const getRandomId = async () =>
            (Math.floor(Math.random() * (countCharacters - 1 + 1) + 1)).toString();
        const randomId = await getRandomId();
        getCharacter(randomId)
            .then(onCharLoaded)
            .then(() => setProcess('confirmed'));
    };

    useEffect(() => {
        updateChar();
        const timerId = setInterval(updateChar, 60000);

        return () => {
            clearInterval(timerId);
        };
    }, []);

    const onCharLoaded = (char: Character) => {
        setChar(char);
    };

    return (
        <div className="randomchar">
            {setContent(process, View, char)}
        </div>
    );
};

const View = ({ ...data }: Character) => {
    const { name, url, height, mass, gender } = data;

    const charId = getIdFromUrl(url);

    return (
        <div className="randomchar__block">
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
            </div>
            <div className="randomchar__descr">
                <p>HEIGHT: {height} cm</p>
                <p>MASS: {mass} kg</p>
                <p>GENDER: {gender}</p>
            </div>
            <div className="randomchar__btns">
                <Link to={`/people/${charId}`} className="button button__main">
                    <div className="inner">More Info</div>
                </Link>
            </div>
            <img className="randomchar__decoration" alt="decoration" src={decoration}></img>
        </div>
    );
};

export default RandomChar;