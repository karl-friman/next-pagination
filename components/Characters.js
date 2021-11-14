import { Fragment } from 'react';
import { filmLinks } from '../shared/films';

function Characters({ props, checkedState, setCheckedState }) {
  const debug = require('debug')('debug:components');
  const colors = require('colors');
  debug('Entering Characters.js'.bgBlue.white);
  debug('props:', props);
  debug('checkedState:', checkedState);
  return (
    <Fragment>
      <ul className='flex-container'>
        {props.posts.map((character, id) => {
          //let disabledFilms = ;
          let characterInFilms = '';
          let spanStyle = '';
          let shouldBeActive = false;

          character.films.map((film) => {
            if (filmLinks[film]) {
              let filmId = filmLinks[film].valueOf();
              let checkedStateId = filmId - 1;
              //characterInFilms += filmLinks[film].valueOf();
              characterInFilms += filmId; // + ':' + film + '' + props.titles[filmId - 1];

              if (checkedState[checkedStateId]) {
                shouldBeActive = true;
              }
            }
          });
          if (!shouldBeActive) {
            spanStyle = 'disabledCharacter';
          }
          return (
            <li
              key={id}
              className={`characterListItem mar-1 bg-distinct ${spanStyle}`}
            >
              <div className={'characterName'}>
                <h6>{character.name}</h6>
              </div>
              <ul className={'characterInfo'}>
                <li>
                  <i className='fas fa-arrows-alt-v txt-fa'></i>
                  <span className={'characterData'}>{character.height}cm</span>
                </li>
                <li>
                  <i className='fas fa-weight-scale txt-fa'></i>
                  <span className={'characterData'}>{character.mass}kg</span>
                </li>
                <li>
                  <i className='fas fa-eye txt-fa'></i>
                  <span className={'characterData'}>{character.eye_color}</span>
                </li>
              </ul>
            </li>
          );
        })}
      </ul>
    </Fragment>
  );
}

export default Characters;
