import { Injectable, effect, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { User } from '../../models/User';
import { environment } from '@environments/environment';
import { AuthService } from '../auth/auth.service';
import { ApiResponse } from '../../models/ApiResponse';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    private http: HttpClient = inject(HttpClient);
    private apiUrl: string = environment.apiUrl;
    private authService: AuthService = inject(AuthService);

    // User en cache (null si pas connecté)
    currentUser = signal<User | null>(null);

    constructor() {
        effect(() => {
            if (this.authService.isAuthenticated()) {
                this.refreshCurrentUser();
            } else {
                this.currentUser.set(null);
            }
        });
    }

    refreshCurrentUser() {
        this.getMe().subscribe({
            next: (user) => this.currentUser.set(user),
            error: () => this.currentUser.set(null),
        });
    }

    getUserById(id: string): Observable<User> {
        return this.http.get<User>(`${this.apiUrl}/users/${id}`);
    }

    getMe(): Observable<User> {
        return this.http.get<User>(`${this.apiUrl}/users/me`);
    }

    updatePurchaseHistory(): Observable<ApiResponse> {
        return this.http.patch<ApiResponse>(`${this.apiUrl}/users/${this.currentUser()?._id}/history`, {}).pipe(
            tap(() => this.refreshCurrentUser())
        );
    }

    updateWishlist(lightNovelId: string): Observable<ApiResponse> {
        return this.http.patch<ApiResponse>(`${this.apiUrl}/users/${this.currentUser()?._id}/wishlist`, { lightNovelId }).pipe(
            tap(() => this.refreshCurrentUser())
        );
    }
}
