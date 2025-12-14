import { Component, output } from '@angular/core';
import { GenreCard } from '../genre-card/genre-card';

@Component({
    selector: 'app-genre-list',
    imports: [GenreCard],
    templateUrl: './genre-list.html',
    styleUrl: './genre-list.css',
})
export class GenreList {
    genres = [
        { name: 'Action', image: 'genres/action.jpg' },
        { name: 'Adventure', image: 'genres/adventure.jpg' },
        { name: 'Comedy', image: 'genres/comedy.jpg' },
        { name: 'Drama', image: 'genres/drama.jpg' },
        { name: 'Fantasy', image: 'genres/fantasy.jpg' },
        { name: 'Horror', image: 'genres/horror.jpg' },
        { name: 'Mystery', image: 'genres/mystery.jpg' },
        { name: 'Romance', image: 'genres/romance.jpg' },
        { name: 'Sci-Fi', image: 'genres/sci-fi.jpg' },
        { name: 'Slice of Life', image: 'genres/slice-of-life.jpg' },
        { name: 'Supernatural', image: 'genres/supernatural.jpg' },
    ]
    genreHovered = output<string>();

    onGenreHover(imageUrl: string) {
        this.genreHovered.emit(imageUrl);
    }
}
