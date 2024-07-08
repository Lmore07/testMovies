import { IMovieGenreResponse } from './../../../../libs/interfaces/movies/movieInterface';
import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatCommonModule } from '@angular/material/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { IGenreResponse } from '../../../../libs/interfaces/genres/genresInterface';
import { GenreService } from '../../../../libs/services/genre.service';

@Component({
  selector: 'app-view-genre',
  standalone: true,
  imports: [
    MatDialogModule,
    MatCommonModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
  ],
  templateUrl: './view-genre.component.html',
  styleUrl: './view-genre.component.css',
})
export class ViewGenreComponent {
  genreForm!: FormGroup;
  movies: IMovieGenreResponse[] = [];
  constructor(
    public dialogRef: MatDialogRef<ViewGenreComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IGenreResponse,
    private fb: FormBuilder,
    private genreService: GenreService
  ) {
    this.genreForm = this.fb.group({
      nameGenre: [data.nameGenre, [Validators.required]],
    });
  }

  ngOnInit() {
    this.genreService.getMoviesByGenre(this.data.genreId).subscribe({
      next: (response) => {
        console.log(response);
        this.movies = response.data!;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
