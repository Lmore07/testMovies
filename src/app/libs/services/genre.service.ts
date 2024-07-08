import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { IGeneralResponse } from '../interfaces/generalInterface';
import { IGenreRequest, IGenreResponse } from '../interfaces/genres/genresInterface';
import { IMovieGenreResponse } from '../interfaces/movies/movieInterface';

@Injectable({
  providedIn: 'root',
})
export class GenreService {
  urlApi = environment.API;
  constructor(private http: HttpClient) {}

  getGenres(currentPage: number = 1, pageSize: number = 10) {
    return this.http.get<IGeneralResponse<IGenreResponse>>(
      `${this.urlApi}/Genres?currentPage=${currentPage}&pageSize=${pageSize}`
    );
  }

  getGenreById(id: number) {
    return this.http.get<IGeneralResponse<IGenreResponse>>(
      `${this.urlApi}/Genres/${id}`
    );
  }

  addGenre(data: IGenreRequest) {
    return this.http.post<IGeneralResponse<IGenreResponse>>(
      `${this.urlApi}/Genres`,
      data
    );
  }

  editGenre(genreId: number, data: IGenreRequest) {
    return this.http.put<IGeneralResponse<IGenreResponse>>(
      `${this.urlApi}/Genres/${genreId}`,
      data
    );
  }

  deleteGenre(id: number) {
    return this.http.delete<IGeneralResponse<IGenreResponse>>(
      `${this.urlApi}/Genres/${id}`
    );
  }

  getMoviesByGenre(idGenre:number) {
    return this.http.get<IGeneralResponse<IMovieGenreResponse>>(
      `${this.urlApi}/MovieGenre/${idGenre}?pageSize=20`
    );
  }
}
