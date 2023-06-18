import { useState, useEffect, useRef, useMemo, FC } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { Character } from '../../utils/types';
import useStarWarsService from '../../services/StarWarsService';
import { setContentList } from '../../utils/setContent';

import './charList.scss';

interface CharListProps {
  onCharSelected: (url: string, name: string) => void;
}

const CharList: FC<CharListProps> = (props) => {
  const [charList, setCharList] = useState<Character[]>([]);
  const [newItemLoading, setNewItemLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalCharacters, setTotalCharacters] = useState<number>(0);

  const { getAllCharacters, process, setProcess, getCount } = useStarWarsService();

  const onRequest = () => {
    setNewItemLoading(true);
    getAllCharacters(page)
      .then(onCharListLoaded)
      .then(() => setProcess('confirmed'));
  };

  useEffect(() => {
    getCount('people').then((count) => setTotalCharacters(count));
    onRequest();
  }, []);

  const onCharListLoaded = (newCharList: Character[]) => {
    setCharList((prevCharList) => [...prevCharList, ...newCharList]);
    setNewItemLoading(false);
    setPage((prevPage) => prevPage + 1);
  };

  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

  const focusOnItem = (index: number) => {
    itemRefs.current.forEach((item) => item && item.classList.remove('char__item_selected'));
    itemRefs.current[index]?.classList.add('char__item_selected');
    itemRefs.current[index]?.focus();
  };

  function renderItems(arr: Character[]) {
    const items = arr.map((item, i) => {
      return (
        <CSSTransition key={item.url} timeout={500} classNames="char__item">
          <li
            className="char__item"
            tabIndex={0}
            ref={(el) => (itemRefs.current[i] = el)}
            key={item.url}
            onClick={() => {
              props.onCharSelected(item.url, item.name);
              focusOnItem(i);
            }}
            onKeyDown={(e) => {
              if (e.key === ' ' || e.key === 'Enter') {
                props.onCharSelected(item.url, item.name);
                focusOnItem(i);
              }
            }}
          >
            <div className="char__name">{item.name}</div>
            <p>This could be your picture</p>
          </li>
        </CSSTransition>
      );
    });

    return (
      <TransitionGroup component={'ul'} className="char__grid">
        {items}
      </TransitionGroup>
    );
  }

  const elements = useMemo(() => {
    return setContentList(process, () => renderItems(charList), newItemLoading);
  }, [process]);

  const isButtonDisabled = newItemLoading || charList.length >= totalCharacters;

  return (
    <div className="char__list">
      {elements}
      <button
        className="button button__main button__long"
        disabled={isButtonDisabled}
        onClick={onRequest}
      >
        <div className="inner">load more</div>
      </button>
    </div>
  );
};

export default CharList;