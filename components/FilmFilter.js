import { useState } from 'react';
import { Fragment } from 'react';

function FilmFilter({ titles, checkedState, setCheckedState }) {
  const handleOnChange = (position) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === position ? !item : item
    );
    setCheckedState(updatedCheckedState);
  };

  return (
    <Fragment>
      <h3>Select Toppings</h3>
      <ul className='toppings-list'>
        {titles.map((title, index) => {
          return (
            <li key={index}>
              <div className='toppings-list-item'>
                <div className='left-section'>
                  <input
                    type='checkbox'
                    id={`custom-checkbox-${index}`}
                    name={title}
                    value={title}
                    checked={checkedState[index]}
                    onChange={() => handleOnChange(index)}
                  />
                  <label htmlFor={`custom-checkbox-${index}`}>{title}</label>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </Fragment>
  );
}

export default FilmFilter;
