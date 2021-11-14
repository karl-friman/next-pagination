import { Fragment } from 'react';
import { filmLinks } from '../shared/films';
function Characters({ props, checkedState, setCheckedState }) {
  console.log(props);
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
              // if (filmLinks[film].valueOf() == disabledFilm) {
              //   spanStyle = 'disabledCharacter';
              // }

              console.log('Checked state:', checkedState);
              console.log(
                'Current state:',
                filmId,
                checkedState[checkedStateId]
              );
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
              <div className={'characterName'}>{character.name}</div>
              <ul className={'characterInfo'}>
                <li>
                  <i className='fas fa-arrows-alt-v txt-fa'></i>
                  <span className={'characterData'}>{character.height}cm</span>
                </li>
                <li>
                  <i className='fas fa-weight-hanging txt-fa'></i>
                  <span className={'characterData'}>{character.mass}kg</span>
                </li>
                <li>
                  <i className='fas fa-eye txt-fa'></i>
                  <span className={'characterData'}>{character.eye_color}</span>
                </li>
                {/* <li>
            <i className='fas fa-venus-mars'></i>
            <span className={'characterData'}>{character.gender}</span>
          </li> */}
              </ul>
            </li>
          );
        })}
      </ul>
    </Fragment>
  );
}

export default Characters;
