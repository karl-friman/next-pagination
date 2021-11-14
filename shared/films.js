import axios from 'axios';

export const filmLinks = {
  'https://swapi.dev/api/films/1/': 1,
  'https://swapi.dev/api/films/2/': 2,
  'https://swapi.dev/api/films/3/': 3,
  'https://swapi.dev/api/films/4/': 4,
  'https://swapi.dev/api/films/5/': 5,
  'https://swapi.dev/api/films/6/': 6,
  //   'https://swapi.dev/api/films/7/': 7,
  //   'https://swapi.dev/api/films/8/': 8,
  //   'https://swapi.dev/api/films/9/': 9,
};

export async function getTitles() {
  const debug = require('debug')('debug:shared');
  const colors = require('colors');

  debug('Entering getTitles()'.bgBlue.white);

  let titles = [];
  const totalFilms = Object.keys(filmLinks).length;

  for (let index = 1; index <= totalFilms; index++) {
    const uri = `https://swapi.dev/api/films/${index}`;
    const result = await axios.get(uri);
    titles.push(result.data.title);
  }

  debug('titles:', titles);

  return titles;
}
