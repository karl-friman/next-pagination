import { Fragment } from 'react';
import { filmLinks } from '../shared/films';
import { Character } from '../types'

interface Props {
  checkedState: boolean[],
  props: {
    posts: Character[]
  }
}

interface CharacterData {
  id: number,
  name: Character["name"],
  height: Character["height"],
  mass: Character["mass"],
  eye_color: Character["eye_color"],
  spanStyle: string,
}


function Characters({ props, checkedState }: Props) {
  const debug = require('debug')('debug:components');
  const colors = require('colors');
  //debug('Entering Characters.js'.bgBlue.white);
  debug('props:', props);
  debug('checkedState:', checkedState);

  return (
    <Fragment>
      <ul className='flex-container'>
        {props.posts.map((character, id) => {
          let characterInFilms = '';

          let shouldBeActive = false;

          let characterData: CharacterData = {
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
            if (filmLinks[film as unknown as 'https://swapi.dev/api/films/3/']) {
              let filmId = filmLinks[film as unknown as 'https://swapi.dev/api/films/3/'].valueOf();

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
          return <Item characterData={characterData} key={id}/>;
        })}
      </ul>
    </Fragment>
  );
}
interface ItemProps {
  characterData: CharacterData,
  key: number
}
const Item: React.FC<ItemProps> = (props: ItemProps) => {
  return (
    <li
      key={props.characterData.id}
      className={`characterListItem mar-1 bg-distinct ${props.characterData.spanStyle}`}
    >
      <div className={'characterName'}>
        <h6>{props.characterData.name}</h6>
      </div>
      <ul className={'characterInfo'}>
        <li>
          <i className='fas fa-arrows-alt-v txt-fa'></i>
          <span className={'characterData'}>{props.characterData.height}cm</span>
        </li>
        <li>
          <i className='fas fa-weight-scale txt-fa'></i>
          <span className={'characterData'}>{props.characterData.mass}kg</span>
        </li>
        <li>
          <i className='fas fa-eye txt-fa'></i>
          <span className={'characterData'}>{props.characterData.eye_color}</span>
        </li>
      </ul>
    </li>
  );
};
export default Characters;
