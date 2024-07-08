import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MatCommonModule,
  provideNativeDateAdapter,
} from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DialogService } from 'primeng/dynamicdialog';
import { IMovieResponse } from '../../../../libs/interfaces/movies/movieInterface';
import { GenreSelectComponent } from '../genre-select/genre-select.component';

@Component({
  selector: 'app-edit-movie',
  standalone: true,
  imports: [
    MatDialogModule,
    MatCommonModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDatepickerModule,
  ],
  templateUrl: './edit-movie.component.html',
  styleUrl: './edit-movie.component.css',
  providers: [DialogService, provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditMovieComponent {
  movieForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditMovieComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IMovieResponse,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {
    this.movieForm = this.fb.group({
      titleMovie: [data.titleMovie, [Validators.required]],
      releaseDate: [data.releaseDate, [Validators.required]],
      genreIds: [
        data.genres.map((genre) => genre.genreId),
        [Validators.required],
      ],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  openGenreDialog(): void {
    const dialogRef = this.dialog.open(GenreSelectComponent, {
      width: '250px',
      data: { selectedGenres: this.movieForm.get('genreIds')?.value },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.movieForm.patchValue({ genreIds: result });
      }
    });
  }
}
