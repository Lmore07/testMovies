import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-genre',
  standalone: true,
  imports: [],
  templateUrl: './delete-genre.component.html',
  styleUrl: './delete-genre.component.css',
})
export class DeleteGenreComponent {
  constructor(public dialogRef: MatDialogRef<DeleteGenreComponent>) {}

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onConfirmDelete() {
    this.dialogRef.close(true);
  }
}
