import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ButtonComponent } from '../../components/button/button.component';
import { TableComponent } from '../../components/table/table.component';
import { TableHeader } from '../../libs/interfaces/generalInterface';
import { IMovieResponse } from '../../libs/interfaces/movies/movieInterface';
import { MovieService } from '../../libs/services/movie.service';
import { AddMovieComponent } from './dialogs/add-movie/add-movie.component';
import { DeleteMovieComponent } from './dialogs/delete-movie/delete-movie.component';
import { EditMovieComponent } from './dialogs/edit-movie/edit-movie.component';
import { ViewMovieComponent } from './dialogs/view-movie/view-movie.component';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [TableComponent, ButtonComponent],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.css',
})
export class MoviesComponent implements OnInit {
  title: string = 'Catálogo de Películas';
  headers: TableHeader[] = [
    { key: 'titleMovie', label: 'Título' },
    { key: 'releaseDate', label: 'Fecha de lanzamiento' },
    { key: 'genres', label: 'Género' },
  ];
  movies: IMovieResponse[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalItems: number = 0;
  totalPages: number = 0;

  constructor(private movieService: MovieService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.movieService.getMovies(this.currentPage, this.itemsPerPage).subscribe({
      next: (response) => {
        this.movies = response.data!;
        this.totalItems = response.pagination?.totalCount!;
        this.totalPages = response.pagination?.totalPages!;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.loadData();
  }

  onAddMovie(): void {
    const dialogRef = this.dialog.open(AddMovieComponent, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe((value: any) => {
      this.movieService.addMovie(value).subscribe({
        next: (response) => {
          console.log(response);
          this.loadData();
        },
        error: (error) => {
          console.error(error);
        },
      });
    });
  }

  onViewMovie(movie: IMovieResponse): void {
    this.dialog.open(ViewMovieComponent, {
      width: '300px',
      data: movie,
    });
  }

  onEditMovie(movie: IMovieResponse): void {
    const dialogRef = this.dialog.open(EditMovieComponent, {
      width: '300px',
      data: movie,
    });

    dialogRef.afterClosed().subscribe((value: any) => {
      this.movieService.editMovie(movie.movieId, value).subscribe({
        next: (response) => {
          console.log(response);
          this.loadData();
        },
        error: (error) => {
          console.error(error);
        },
      });
    });
  }

  onDeleteMovie(movie: any): void {
    const dialogRef = this.dialog.open(DeleteMovieComponent, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe((value: any) => {
      if(value){
        this.movieService.deleteMovie(movie.movieId).subscribe({
          next: (response) => {
            console.log(response);
            this.loadData();
          },
          error: (error) => {
            console.error(error);
          },
        });
      }
    });
  }
}
