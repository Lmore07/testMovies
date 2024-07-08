import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCommonModule } from '@angular/material/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-add-genre',
  standalone: true,
  imports: [
    MatDialogModule,
    MatCommonModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
  ],
  templateUrl: './add-genre.component.html',
  styleUrl: './add-genre.component.css'
})
export class AddGenreComponent {

  genreForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddGenreComponent>,
    private fb: FormBuilder,
  ) {
    this.genreForm = this.fb.group({
      nameGenre: ['', [Validators.required]]
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
