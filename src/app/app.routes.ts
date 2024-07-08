import { Routes } from '@angular/router';
import { MoviesComponent } from './modules/movies/movies.component';

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'movies' },
    { path: 'movies', component:  MoviesComponent},
    
];
