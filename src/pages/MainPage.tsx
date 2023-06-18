import { useState, FC } from 'react';
import { Helmet } from 'react-helmet';

import RandomChar from '../components/randomChar/RandomChar';
import CharList from '../components/charList/CharList';
import CharInfo from '../components/charInfo/CharInfo';
import CharSearchForm from '../components/charSearchForm/CharSearchForm';
import ErrorBoundary from '../components/errorBoundary/ErrorBoundary';
import ScrollToTopButton from '../components/scrollToTop/ScrolltoTop';

import decoration from '../resources/img/x-wing.png';

const MainPage: FC = () => {
    const [selectedChar, setChar] = useState<string | undefined>(undefined);

    const onCharSelected = (url: string) => {
        setChar(url);
    };

    return (
        <>
            <Helmet>
                <meta name="description" content="StarWars information portal" />
                <title>StarWars information portal</title>
            </Helmet>
            <ErrorBoundary>
                <RandomChar />
            </ErrorBoundary>
            <div className="char__content">
                <ErrorBoundary>
                    <CharList onCharSelected={onCharSelected} />
                </ErrorBoundary>
                <div>
                    <ErrorBoundary>
                        <CharInfo charId={selectedChar} />
                    </ErrorBoundary>
                    <ErrorBoundary>
                        <CharSearchForm />
                    </ErrorBoundary>
                </div>
            </div>
            <ScrollToTopButton />
            <img className="bg-decoration" src={decoration} alt="x-wing" />
        </>
    );
};

export default MainPage;