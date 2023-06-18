import {FC} from 'react';
import { Helmet } from 'react-helmet';

import FilmsList from '../components/FilmsList/FilmsList';

const FilmsPage: FC = () => {
  return (
    <>
      <Helmet>
        <meta name="description" content="Page with list of our films" />
        <title>Films page</title>
      </Helmet>
      <FilmsList />
    </>
  );
};

export default FilmsPage;
