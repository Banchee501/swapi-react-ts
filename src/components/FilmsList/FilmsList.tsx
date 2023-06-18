import { useState, useEffect, FC, Fragment } from 'react';
import { Link } from 'react-router-dom';

import useStarWarsService from '../../services/StarWarsService';
import getIdFromUrl from '../../utils/getIdFromUrl';
import { Film } from '../../utils/types';
import { setContentList } from '../../utils/setContent';

import './filmsList.scss';

const FilmsList: FC = () => {
    const [filmsList, setFilmsList] = useState<Film[]>([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [hasNextPage, setHasNextPage] = useState(true);

    const { getAllFilms, process, setProcess, getCharacterTitle } = useStarWarsService();

    useEffect(() => {
        onRequest();
    }, []);

    const onRequest = (initial?: boolean) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllFilms(page)
            .then(onFilmsListLoaded)
            .then(() => setProcess('confirmed'));
    };

    const onFilmsListLoaded = async (newFilmsList: Film[]): Promise<void> => {
        if (newFilmsList.length < 8) {
            setHasNextPage(false);
        }

        const filmsWithCharacterNames = await Promise.all(
            newFilmsList.map(async (film) => {
                const characters = await Promise.all(film.characters.map(getCharacterTitle));
                return { ...film, characters };
            })
        );

        setFilmsList([...filmsList, ...filmsWithCharacterNames]);
        setNewItemLoading(false);
        setPage((prevPage) => prevPage + 1);
    };

    function renderItems(arr: Film[]) {
        const items = arr.map((item) => {
            return (
                <li className="films__item" key={item.url}>
                    <div>
                        <h2 className="films__item-title">
                            Episode {item.episode_id}: {item.title}
                        </h2>
                        <div className="films__item-details">
                            <div>
                                <strong>Release Date:</strong> {item.release_date}
                            </div>
                            <div>
                                <strong>Director:</strong> {item.director}
                            </div>
                            <div>
                                <strong>Producer:</strong> {item.producer}
                            </div>
                            <br />
                            <div>
                                <strong>Opening Crawl:</strong> {item.opening_crawl}
                            </div>
                            <br />
                            <div>
                                <strong>Characters:</strong>
                                <br />
                                {item.characters.map((character, index) => (
                                    <Fragment key={index}>
                                        <Link to={`/people/${getIdFromUrl(item.url)}`}>{character}</Link>
                                        <br />
                                    </Fragment>
                                ))}
                            </div>
                        </div>
                    </div>
                </li>
            );
        });

        return <ul className="films__grid">{items}</ul>;
    }

    return (
        <div className="films__list">
            {setContentList(process, () => renderItems(filmsList), newItemLoading)}
            <button
                className="button button__main button__long"
                disabled={newItemLoading || !hasNextPage}
                style={{ display: hasNextPage ? 'block' : 'none' }}
                onClick={() => onRequest()}
            >
                <div className="inner">load more</div>
            </button>
        </div>
    );
};

export default FilmsList;
