import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatCommonModule, provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DialogService } from 'primeng/dynamicdialog';
import { GenreSelectComponent } from '../genre-select/genre-select.component';

@Component({
  selector: 'app-add-movie',
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
  templateUrl: './add-movie.component.html',
  styleUrl: './add-movie.component.css',
  providers: [DialogService, provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddMovieComponent {
  movieForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddMovieComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private dialog: MatDialog
  ) {
    this.movieForm = this.fb.group({
      titleMovie: ['', [Validators.required]],
      releaseDate: ['', [Validators.required]],
      genreIds: [[], [Validators.required]],
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
