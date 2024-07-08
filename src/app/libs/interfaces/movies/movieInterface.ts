import { IGenreResponse } from '../genres/genresInterface';

export interface IMovieResponse {
  movieId: number;
  titleMovie: string;
  releaseDate: Date;
  genres: IGenreResponse[];
}

export interface IMovieRequest {
  titleMovie: string;
  releaseDate: Date;
  genres: number[];
}

export interface IMovieGenreResponse {
  movieId: number;
  titleMovie: string;
  releaseDate: Date;
}