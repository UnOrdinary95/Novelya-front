import { Component, signal } from '@angular/core';
import { GenreList } from './components/genre-list/genre-list';
import { lucideBookOpen } from '@ng-icons/lucide';
import { NgIcon, provideIcons } from '@ng-icons/core';

@Component({
    selector: 'app-home',
    imports: [GenreList, NgIcon],
    templateUrl: './home.html',
    styleUrl: './home.css',
    providers: [
        provideIcons({
            lucideBookOpen,
        }),
    ]
})
export class Home {
    currentUrl = signal<string>('/genres/action.jpg');

    // $event est la valeur émise par le output (ici, une URL d'image)
    updateBackground(imageUrl: string) {
        this.currentUrl.set('/' + imageUrl);
    }
}
