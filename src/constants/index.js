export const BASE_URL = 'http://localhost:5000/api';
// export const BASE_URL = 'https://sytnikov.site:5000/api';

export const ACTORS_ENTITY_NAME = 'actors';
export const DIRECTORS_ENTITY_NAME = 'directors';
export const MOVIES_ENTITY_NAME = 'movies';
export const STUDIOS_ENTITY_NAME = 'studios';
export const SERVICES_ENTITY_NAME = 'services';
export const GENRES_ENTITY_NAME = 'genres';
export const COUNTRIES_ENTITY_NAME = 'countries';
export const LOCATIONS_ENTITY_NAME = 'locations';

export const emptyActor = {
  id: null,
  fullName: '',
  country: '',
  birthDate: '',
  deathDate: '',
  photo: '',
  biography: '',
};

export const emptyDirector = {
  id: null,
  fullName: '',
  country: '',
  birthDate: '',
  deathDate: '',
  photo: '',
  biography: '',
};

export const emptyMovie = {
  id: null,
  title: '',
  genre: '',
  releaseYear: '',
  poster: '',
  trailer: '',
  directors: [''],
  actors: [''],
  studios: [''],
  storyline: '',
};

export const emptyStudio = {
  id: null,
  title: '',
  location: '',
  foundationYear: '',
  logo: '',
  about: '',
};

export const emptyGenre = {
  id: null,
  title: '',
  logo: '',
};

export const emptyCountry = {
  id: null,
  title: '',
  flag: '',
};

export const emptyLocation = {
  id: null,
  title: '',
  country: '',
  coatOfArms: '',
};
