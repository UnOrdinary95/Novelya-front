import { Component, signal } from '@angular/core';
import { GenreList } from './components/genre-list/genre-list';
import { lucideBookOpen } from '@ng-icons/lucide';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { LightnovelList } from '../lightnovel/components/lightnovel-list/lightnovel-list';
import { LightNovel } from '../../core/models/LightNovel';

@Component({
    selector: 'app-home',
    imports: [GenreList, NgIcon, LightnovelList],
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
    lightNovels = signal<LightNovel[]>([
        {
            _id: '1',
            title: 'That Time I Got Reincarnated as a Slime Slime Slime Slime Slime Slime Slime Slime Slime Slime Slime Slime',
            author: 'Fuse',
            price: 12.99,
            description: 'Un homme ordinaire se réincarne en Slime après avoir été tué.',
            cover: '/genres/fantasy.jpg',
            genres: ['Fantasy', 'Adventure'],
            inStock: true,
        },
        {
            _id: '2',
            title: 'Solo Leveling',
            author: 'Chugong',
            price: 14.99,
            description: 'Un chasseur faible découvre un mystérieux système.',
            cover: '/genres/sci-fi.jpg',
            genres: ['Action', 'Fantasy'],
            inStock: false,
        },
    ]);

    // $event est la valeur émise par le output (ici, une URL d'image)
    updateBackground(imageUrl: string) {
        this.currentUrl.set('/' + imageUrl);
    }
}
