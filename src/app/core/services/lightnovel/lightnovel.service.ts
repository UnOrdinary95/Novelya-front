import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LightNovel } from '../../models/LightNovel';
import { environment } from '../../../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class LightNovelService {
    private http: HttpClient = inject(HttpClient);
    private apiUrl: string = environment.apiUrl;

    getLightNovels(): Observable<LightNovel[]> {
        return this.http.get<LightNovel[]>(`${this.apiUrl}/lightnovels`);
    }

    getLightNovelsByGenre(genreName: string): Observable<LightNovel[]> {
        return this.http.get<LightNovel[]>(`${this.apiUrl}/lightnovels/genre/${genreName.toLowerCase()}`);
    }

    getLightNovelsByName(name: string): Observable<LightNovel[]> {
        return this.http.get<LightNovel[]>(`${this.apiUrl}/lightnovels/search/${name}`);
    }
}
