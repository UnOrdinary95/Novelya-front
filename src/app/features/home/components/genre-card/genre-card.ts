import { Component, input, output } from '@angular/core';
import { HlmCard } from '@spartan-ng/helm/card';
import { NgOptimizedImage } from '@angular/common';

@Component({
    selector: 'app-genre-card',
    imports: [HlmCard, NgOptimizedImage],
    templateUrl: './genre-card.html',
    styleUrl: './genre-card.css',
})
export class GenreCard {
    image = input.required<string>();
    genreName = input.required<string>();
    hovered = output<string>();

    onMouseOver() {
        this.hovered.emit(this.image());
    }
}
