import { Component } from '@angular/core';
import { TableHeader } from '../../libs/interfaces/generalInterface';
import { IGenreResponse } from '../../libs/interfaces/genres/genresInterface';
import { GenreService } from '../../libs/services/genre.service';
import { MatDialog } from '@angular/material/dialog';
import { ButtonComponent } from '../../components/button/button.component';
import { TableComponent } from '../../components/table/table.component';
import { AddGenreComponent } from './dialogs/add-genre/add-genre.component';
import { ViewGenreComponent } from './dialogs/view-genre/view-genre.component';
import { EditGenreComponent } from './dialogs/edit-genre/edit-genre.component';
import { DeleteGenreComponent } from './dialogs/delete-genre/delete-genre.component';

@Component({
  selector: 'app-genres',
  standalone: true,
  imports: [ButtonComponent, TableComponent],
  templateUrl: './genres.component.html',
  styleUrl: './genres.component.css',
})
export class GenresComponent {
  title: string = 'Catálogo de Géneros';
  headers: TableHeader[] = [{ key: 'nameGenre', label: 'Género de película' }];
  genres: IGenreResponse[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalItems: number = 0;
  totalPages: number = 0;

  constructor(private genreService: GenreService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.genreService.getGenres(this.currentPage, this.itemsPerPage).subscribe({
      next: (response) => {
        this.genres = response.data!;
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

  onAddGenre() {
    const dialogRef = this.dialog.open(AddGenreComponent, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe((value: any) => {
      this.genreService.addGenre(value).subscribe({
        next: (response) => {
          this.loadData();
        },
        error: (error) => {
          console.error(error);
        },
      });
    });
  }

  onViewGenre(genre: IGenreResponse) {
    this.dialog.open(ViewGenreComponent, {
      width: '300px',
      data: genre,
    });
  }

  onEditGenre(genre: IGenreResponse) {
    const dialogRef = this.dialog.open(EditGenreComponent, {
      width: '300px',
      data: genre,
    });

    dialogRef.afterClosed().subscribe((value: any) => {
      this.genreService.editGenre(genre.genreId, value).subscribe({
        next: (response) => {
          this.loadData();
        },
        error: (error) => {
          console.error(error);
        },
      });
    });
  }

  onDeleteGenre(genre: IGenreResponse) {
    const dialogRef = this.dialog.open(DeleteGenreComponent, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe((value: any) => {
      if (value) {
        this.genreService.deleteGenre(genre.genreId).subscribe({
          next: (response) => {
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
