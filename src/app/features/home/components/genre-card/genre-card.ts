import { Component, input } from '@angular/core';
import { HlmCard } from '@spartan-ng/helm/card';

@Component({
    selector: 'app-genre-card',
    imports: [HlmCard],
    templateUrl: './genre-card.html',
    styleUrl: './genre-card.css',
})
export class GenreCard {
    image = input.required<string>();
    genreName = input.required<string>();
}
