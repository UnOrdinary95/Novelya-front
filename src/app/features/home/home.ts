import { Component } from '@angular/core';
import { GenreList } from './components/genre-list/genre-list';

@Component({
    selector: 'app-home',
    imports: [GenreList],
    templateUrl: './home.html',
    styleUrl: './home.css',
})
export class Home {}
