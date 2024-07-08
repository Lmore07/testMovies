import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { IGeneralResponse } from '../interfaces/generalInterface';
import {
  IMovieRequest,
  IMovieResponse,
} from '../interfaces/movies/movieInterface';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  urlApi = environment.API;
  constructor(private http: HttpClient) {}

  getMovies(currentPage: number = 1, pageSize: number = 10) {
    return this.http.get<IGeneralResponse<IMovieResponse>>(
      `${this.urlApi}/Movies?currentPage=${currentPage}&pageSize=${pageSize}`
    );
  }

  addMovie(movie: IMovieRequest) {
    return this.http.post<IMovieResponse>(`${this.urlApi}/Movies`, movie);
  }

  editMovie(idMovie: number, movie: IMovieRequest) {
    return this.http.put<IMovieResponse>(
      `${this.urlApi}/Movies/${idMovie}`,
      movie
    );
  }

  deleteMovie(idMovie: number) {
    return this.http.delete<IMovieResponse>(`${this.urlApi}/Movies/${idMovie}`);
  }
}
