import { Helmet } from 'react-helmet';
import { useState, useEffect, Fragment, FC } from 'react';

import useStarWarsService from '../../services/StarWarsService';
import { Character, Film } from '../../utils/types';

import './singleCharacterLayout.scss';

interface SingleCharacterLayoutProps {
    data: Character;
}

const SingleCharacterLayout: FC<SingleCharacterLayoutProps> = ({ data }) => {
    const { name, height, mass, hair_color, eye_color, birth_year, gender, homeworld, films } = data;
    const { getFilmTitles, getPlanetTitle } = useStarWarsService();

    const [filmTitles, setFilmTitles] = useState<string[]>([]);
    const [homeworldTitle, setHomeworldTitle] = useState<string>('');

    useEffect(() => {
        const fetchFilmTitles = async () => {
            const titles = await getFilmTitles(films);
            setFilmTitles(titles.map((film: Film) => film.title));
        };

        const fetchHomeworldTitle = async () => {
            const planetTitle = await getPlanetTitle(homeworld);
            setHomeworldTitle(planetTitle);
        };

        fetchFilmTitles();
        fetchHomeworldTitle();
    }, [films, homeworld]);

    const charInfoList = [
        { label: 'Height', value: height },
        { label: 'Mass', value: mass },
        { label: 'Hair Color', value: hair_color },
        { label: 'Eye Color', value: eye_color },
        { label: 'Birth Year', value: birth_year },
        { label: 'Gender', value: gender },
        {
            label: 'Homeworld',
            value: <span className="char-info">{homeworldTitle}</span>,
        },
        {
            label: 'Films',
            value: filmTitles.length > 0 ? (
                <div className="char-info">
                    {filmTitles.map((title, index) => (
                        <Fragment key={index}>
                            <span>{title}</span>
                            {index !== filmTitles.length - 1 && <br />}
                        </Fragment>
                    ))}
                </div>
            ) : (
                <p className="char-info">There are no films with this character.</p>
            ),
        },
    ];

    return (
        <div className="single-char">
            <Helmet>
                <meta name="description" content={`${name} page`} />
                <title>{name}</title>
            </Helmet>
            <h2 className="single-char__name">{name}</h2>
            <div className="single-char__info">
                <ul className="single-char__list">
                    {charInfoList.map(({ label, value }) => (
                        <li key={label}>
                            <div className="single-char__label">{label}: </div>
                            <div className="single-char__value">{value}</div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default SingleCharacterLayout;
