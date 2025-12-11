import { Component } from '@angular/core';
import { GenreCard } from './components/genre-card/genre-card';

@Component({
    selector: 'app-home',
    imports: [GenreCard],
    templateUrl: './home.html',
    styleUrl: './home.css',
})
export class Home {}
