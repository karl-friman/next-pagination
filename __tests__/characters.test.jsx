/**
 * @jest-environment jsdom
 */

import React, { useState } from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Characters from '../components/Characters';

const fake_response = {
  posts: [
    {
      name: 'Luke Skywalker',
      height: '172',
      mass: '77',
      hair_color: 'blond',
      skin_color: 'fair',
      eye_color: 'blue',
      birth_year: '19BBY',
      gender: 'male',
      homeworld: 'https://swapi.dev/api/planets/1/',
      films: [],
      species: [],
      vehicles: [],
      starships: [],
      created: '2014-12-09T13:50:51.644000Z',
      edited: '2014-12-20T21:17:56.891000Z',
      url: 'https://swapi.dev/api/people/1/',
    },
  ],
};

const props = {
  totalCount: 5,
  pageCount: 5,
  nextPage: 'url',
  prevPage: 'url',
  perPage: 5,
  posts: [
    {
      name: 'Luke Skywalker',
      height: '172',
      mass: '77',
      hair_color: 'blond',
      skin_color: 'fair',
      eye_color: 'blue',
      birth_year: '19BBY',
      gender: 'male',
      homeworld: 'https://swapi.dev/api/planets/1/',
      films: [],
      species: [],
      vehicles: [],
      starships: [],
      created: '2014-12-09T13:50:51.644000Z',
      edited: '2014-12-20T21:17:56.891000Z',
      url: 'https://swapi.dev/api/people/1/',
    },
  ],
  isLoading: false,
  titles: ['title1', 'title2'],
};
const checkedState = new Array(5).fill(true);

describe('Characters', () => {
  it('renders a character name', () => {
    render(<Characters props={props} checkedState={checkedState} />);

    const heading = screen.getByRole('heading', {
      name: /Luke/i,
    });

    expect(heading).toBeInTheDocument();
  });
});

describe('Characters', () => {
  it('renders a character height', () => {
    render(<Characters props={props} checkedState={checkedState} />);

    const height = screen.getByText('172', { exact: false }); // full string match
    expect(height).toBeInTheDocument();
  });
});
