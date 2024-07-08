import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-movie',
  standalone: true,
  imports: [],
  templateUrl: './delete-movie.component.html',
  styleUrl: './delete-movie.component.css',
})
export class DeleteMovieComponent {
  constructor(public dialogRef: MatDialogRef<DeleteMovieComponent>) {}

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onConfirmDelete() {
    this.dialogRef.close(true);
  }
}
