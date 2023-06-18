import { useParams } from 'react-router-dom';
import { useState, useEffect, FC, ComponentType } from 'react';

import useStarWarsService from '../services/StarWarsService';
import { setContent } from '../utils/setContent';

import { Film, Character } from '../utils/types';

interface SinglePageProps {
    Component: ComponentType<any>;
    dataType: 'film' | 'character' | 'planet';
}

const SinglePage: FC<SinglePageProps> = ({ Component, dataType }) => {
    const { id } = useParams<{ id: string }>();
    const [data, setData] = useState<Film | Character | string | null>(null);
    const { getFilmTitle, getCharacter, clearError, process, setProcess, getPlanetTitle } = useStarWarsService();

    useEffect(() => {
        updateData();
    }, [id]);

    const updateData = () => {
        clearError();

        if (id) {
            switch (dataType) {
                case 'film':
                    getFilmTitle(id).then(onDataLoaded).then(() => setProcess('confirmed'));
                    break;
                case 'character':
                    getCharacter(id).then(onDataLoaded).then(() => setProcess('confirmed'));
                    break;
                case 'planet':
                    getPlanetTitle(id).then(onDataLoaded).then(() => setProcess('confirmed'));
                    break;
                default:
                    return;
            }
        }
    };

    const onDataLoaded = (data: Film | string | Character | null) => {
        setData(data);
    };

    return (
        <>
            {setContent(process, Component, { data })}
        </>
    );
};

export default SinglePage;