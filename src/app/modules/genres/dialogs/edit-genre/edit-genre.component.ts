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

@Component({
  selector: 'app-edit-genre',
  standalone: true,
  imports: [
    MatCommonModule,
    FormsModule,
    MatDialogModule,
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
  ],
  templateUrl: './edit-genre.component.html',
  styleUrl: './edit-genre.component.css',
})
export class EditGenreComponent {
  genreForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditGenreComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IGenreResponse,
    private fb: FormBuilder
  ) {
    this.genreForm = this.fb.group({
      nameGenre: [data.nameGenre, [Validators.required]],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
