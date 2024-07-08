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
import { IMovieResponse } from '../../../../libs/interfaces/movies/movieInterface';

@Component({
  selector: 'app-view-movie',
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
  templateUrl: './view-movie.component.html',
  styleUrl: './view-movie.component.css',
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewMovieComponent {
  movieForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ViewMovieComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IMovieResponse,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {
    this.movieForm = this.fb.group({
      titleMovie: [data.titleMovie, [Validators.required]],
      releaseDate: [data.releaseDate, [Validators.required]],
      genreIds: [
        data.genres.map((genre) => genre.nameGenre).join(", "),
        [Validators.required],
      ],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
