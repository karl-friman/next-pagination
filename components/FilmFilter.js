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
      <div className='container'>
        <ul className='flex-container filter'>
          {titles.map((title, index) => {
            return (
              <li key={index}>
                <div className='pad-end-3 txt-distinct'>
                  <input
                    type='checkbox'
                    className=''
                    id={`custom-checkbox-${index}`}
                    name={title}
                    value={title}
                    checked={checkedState[index]}
                    onChange={() => handleOnChange(index)}
                  />
                  <label htmlFor={`custom-checkbox-${index}`} className='pad-2'>
                    {title}
                  </label>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </Fragment>
  );
}

export default FilmFilter;
