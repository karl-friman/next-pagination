export interface FilmLinks {
    'https://swapi.dev/api/films/1/': number
    'https://swapi.dev/api/films/2/': number
    'https://swapi.dev/api/films/3/': number
    'https://swapi.dev/api/films/4/': number
    'https://swapi.dev/api/films/5/': number
    'https://swapi.dev/api/films/6/': number
  }

export interface Character {
    name:       string;
    height:     string;
    mass:       string;
    hair_color: string;
    skin_color: string;
    eye_color:  string;
    birth_year: string;
    gender:     string;
    homeworld:  string;
    films:      FilmLinks[];
    species:    any[];
    vehicles:   string[];
    starships:  string[];
    created:    Date;
    edited:     Date;
    url:        string;
}