import { useState, useEffect, FC } from 'react';

import useStarWarsService from '../../services/StarWarsService';
import { Planet } from '../../utils/types';
import ScrollToTopButton from '../scrollToTop/ScrolltoTop';
import { setContentList } from '../../utils/setContent';

import './planetsList.scss';

const PlanetsList: FC = () => {
  const [planetsList, setPlanetsList] = useState<Planet[]>([]);
  const [newItemLoading, setNewItemLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPlanets, setTotalPlanets] = useState<number>(0);

  const { getAllPlanets, process, setProcess, getCount } = useStarWarsService();

  const onRequest = () => {
    setNewItemLoading(true);
    getAllPlanets(page)
      .then(onPlanetsListLoaded)
      .then(() => setProcess('confirmed'))
  };

  useEffect(() => {
    getCount('planets').then((count) => setTotalPlanets(count));
    onRequest();
  }, []);

  const onPlanetsListLoaded = (newPlanetsList: Planet[]) => {
    setPlanetsList((prevList) => [...prevList, ...newPlanetsList]);
    setNewItemLoading(false);
    setPage((prevPage) => prevPage + 1);
  };

  function renderItems(arr: Planet[]) {
    const items = arr.map((item) => (
      <li className="planets__item" key={item.url}>
        <div>
          <h2 className="planets__item-title">{item.name}</h2>
          <div className="planets__item-details">
            <div>
              <strong>Rotation Period:</strong> {item.rotation_period}
            </div>
            <div>
              <strong>Orbital Period:</strong> {item.orbital_period}
            </div>
            <div>
              <strong>Diameter:</strong> {item.diameter}
            </div>
            <div>
              <strong>Climate:</strong> {item.climate}
            </div>
            <div>
              <strong>Gravity:</strong> {item.gravity}
            </div>
            <div>
              <strong>Terrain:</strong> {item.terrain}
            </div>
            <div>
              <strong>Surface Water:</strong> {item.surface_water}
            </div>
            <div>
              <strong>Population:</strong> {item.population}
            </div>
          </div>
        </div>
      </li>
    ));

    return <ul className="planets__grid">{items}</ul>;
  }

  const isButtonDisabled = newItemLoading || planetsList.length >= totalPlanets;

  return (
    <div className="films__list">
      {setContentList(process, () => renderItems(planetsList), newItemLoading)}
      <button
        className="button button__main button__long"
        disabled={isButtonDisabled}
        onClick={onRequest}
      >
        <div className="inner">load more</div>
      </button>
      <ScrollToTopButton />
    </div>
  );
};

export default PlanetsList;

