import { Component } from '@angular/core';
import { TableComponent } from '../../components/table/table.component';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.css'
})
export class MoviesComponent {

  headers = ['Title', 'Genre', 'Year', 'Rating'];
}
