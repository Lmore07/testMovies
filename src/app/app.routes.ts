import { Routes } from '@angular/router';
import { MoviesComponent } from './modules/movies/movies.component';
import { GenresComponent } from './modules/genres/genres.component';

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'movies' },
    { path: 'movies', component:  MoviesComponent},
    { path: 'genres', component:  GenresComponent},

];
