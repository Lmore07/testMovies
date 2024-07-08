import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatCommonModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatListModule } from '@angular/material/list';
import { IGenreResponse } from '../../../../libs/interfaces/genres/genresInterface';
import { GenreService } from '../../../../libs/services/genre.service';

@Component({
  selector: 'app-genre-select',
  standalone: true,
  imports: [
    MatDialogModule,
    MatCommonModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    MatListModule,
    MatSelectModule,
  ],
  templateUrl: './genre-select.component.html',
  styleUrl: './genre-select.component.css',
})
export class GenreSelectComponent {
  genreForm!: FormGroup;
  genres: IGenreResponse[] = [];

  constructor(
    public dialogRef: MatDialogRef<GenreSelectComponent>,
    private genreService: GenreService,
    @Inject(MAT_DIALOG_DATA) public data: { selectedGenres: number[] },
    private fb: FormBuilder
  ) {
    this.genreForm = this.fb.group({
      selectedGenres: [data.selectedGenres || []],
    });
  }

  ngOnInit() {
    this.genreService.getGenres().subscribe({
      next: (response) => {
        this.genres = response.data!;
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
