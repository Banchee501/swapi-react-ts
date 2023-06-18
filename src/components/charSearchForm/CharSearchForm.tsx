import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage as FormikErrorMessage, FormikValues } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';

import useStarWarsService from '../../services/StarWarsService';
import { Character } from '../../utils/types';
import ErrorMessage from '../errorMessage/ErrorMessage';
import getIdFromUrl from '../../utils/getIdFromUrl';

import './charSearchForm.scss';

const CharSearchForm = () => {
    const [char, setChar] = useState<Character | null>(null);
    const [searched, setSearched] = useState(false);
    const { getCharacterByName, clearError, process, setProcess } = useStarWarsService();

    const onCharLoaded = (char: Character[]) => {
        setChar(char[0]);
    };

    const updateChar = (name: string) => {
        clearError();
        setSearched(true);

        getCharacterByName(name)
            .then(onCharLoaded)
            .then(() => setProcess('confirmed'));
    };

    const errorMessage = searched && char === null ? (
        <div className="char__search-error"><ErrorMessage /></div>
    ) : null;

    const results = char !== null && Object.keys(char).length > 0 ? (
        <div className="char__search-wrapper">
            <div className="char__search-success">There is! Visit {char.name} page?</div>
            <Link to={`/people/${getIdFromUrl(char.url)}`} className="button button__secondary">
                <div className="inner">To page</div>
            </Link>
        </div>
    ) : null;

    return (
        <div className="char__search-form">
            <Formik
                initialValues={{
                    charName: ''
                }}
                validationSchema={Yup.object({
                    charName: Yup.string().required('This field is required')
                })}
                onSubmit={({ charName }: FormikValues) => {
                    updateChar(charName);
                }}
            >
                <Form>
                    <label className="char__search-label" htmlFor="charName">
                        Or find a character by name:
                    </label>
                    <div className="char__search-wrapper">
                        <Field id="charName" name="charName" type="text" placeholder="Enter name" />
                        <button type="submit" className="button button__main" disabled={process === 'loading'}>
                            <div className="inner">find</div>
                        </button>
                    </div>
                    <FormikErrorMessage component="div" className="char__search-error" name="charName" />
                </Form>
            </Formik>
            {results}
            {errorMessage}
        </div>
    );
};

export default CharSearchForm;