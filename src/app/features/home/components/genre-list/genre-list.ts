import { Component } from '@angular/core';
import { GenreCard } from '../genre-card/genre-card';

@Component({
    selector: 'app-genre-list',
    imports: [GenreCard],
    templateUrl: './genre-list.html',
    styleUrl: './genre-list.css',
})
export class GenreList {

}
