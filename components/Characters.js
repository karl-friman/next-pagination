import { Fragment } from 'react';
import { filmLinks } from '../shared/films';

function Characters({ props, checkedState }) {
  const debug = require('debug')('debug:components');
  const colors = require('colors');
  debug('Entering Characters.js'.bgBlue.white);
  debug('props:', props);
  debug('checkedState:', checkedState);

  return (
    <Fragment>
      <ul className='flex-container'>
        {props.posts.map((character, id) => {
          let characterInFilms = '';
          let spanStyle = '';
          let shouldBeActive = false;

          let height = character.height;
          let mass = character.mass;
          let eye_color = character.eye_color;

          if (height == 'unknown') {
            height = '? ';
          }
          if (mass == 'unknown') {
            mass = '? ';
          }
          if (eye_color == 'unknown') {
            eye_color = '? ';
          }

          character.films.map((film) => {
            if (filmLinks[film]) {
              let filmId = filmLinks[film].valueOf();
              let checkedStateId = filmId - 1;
              characterInFilms += filmId;

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
                  <span className={'characterData'}>{height}cm</span>
                </li>
                <li>
                  <i className='fas fa-weight-scale txt-fa'></i>
                  <span className={'characterData'}>{mass}kg</span>
                </li>
                <li>
                  <i className='fas fa-eye txt-fa'></i>
                  <span className={'characterData'}>{eye_color}</span>
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
