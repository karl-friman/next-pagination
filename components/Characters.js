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

          let shouldBeActive = false;
          let characterData = {
            id: id,
            name: character.name,
            height: character.height,
            mass: character.mass,
            eye_color: character.eye_color,
            spanStyle: '',
          };

          if (characterData.height == 'unknown') {
            characterData.height = '? ';
          }
          if (characterData.mass == 'unknown') {
            characterData.mass = '? ';
          }
          if (characterData.eye_color == 'unknown') {
            characterData.eye_color = '? ';
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
            characterData.spanStyle = 'disabledCharacter';
          }
          return <Item characterData={characterData} />;
        })}
      </ul>
    </Fragment>
  );
}
const Item = ({ characterData }) => {
  return (
    <li
      key={characterData.id}
      className={`characterListItem mar-1 bg-distinct ${characterData.spanStyle}`}
    >
      <div className={'characterName'}>
        <h6>{characterData.name}</h6>
      </div>
      <ul className={'characterInfo'}>
        <li>
          <i className='fas fa-arrows-alt-v txt-fa'></i>
          <span className={'characterData'}>{characterData.height}cm</span>
        </li>
        <li>
          <i className='fas fa-weight-scale txt-fa'></i>
          <span className={'characterData'}>{characterData.mass}kg</span>
        </li>
        <li>
          <i className='fas fa-eye txt-fa'></i>
          <span className={'characterData'}>{characterData.eye_color}</span>
        </li>
      </ul>
    </li>
  );
};
export default Characters;
