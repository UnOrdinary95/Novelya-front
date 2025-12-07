import { Component, inject, Signal } from '@angular/core';
import { HlmButton } from '@spartan-ng/helm/button';
import { HlmIcon } from '@spartan-ng/helm/icon';
import { HlmInput } from '@spartan-ng/helm/input';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideLogIn, lucideUserPlus, lucideSearch, lucideLogOut, lucideShoppingCart } from '@ng-icons/lucide';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-header',
    imports: [HlmButton, HlmIcon, HlmInput, NgIcon, RouterLink],
    templateUrl: './header.html',
    styleUrl: './header.css',
    providers: [provideIcons({ lucideLogIn, lucideUserPlus, lucideSearch, lucideLogOut, lucideShoppingCart })],
})
export class Header {
    private router = inject(Router);
    authService = inject(AuthService);
    isAuthenticated: Signal<boolean> = this.authService.isAuthenticated;

    logout() {
        this.authService.logout().subscribe({
            next: () => {
                this.router.navigate(['/']);
            }
        });
    }
}
