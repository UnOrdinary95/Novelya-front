import { Component, inject, Signal, computed } from '@angular/core';
import { HlmButton } from '@spartan-ng/helm/button';
import { HlmAvatarImports } from '@spartan-ng/helm/avatar';
import { HlmIcon } from '@spartan-ng/helm/icon';
import { HlmInput } from '@spartan-ng/helm/input';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
    lucideLogIn,
    lucideUserPlus,
    lucideSearch,
    lucideLogOut,
    lucideShoppingCart,
} from '@ng-icons/lucide';
import { RouterLink } from '@angular/router';
import { UserService } from '../../../core/services/user/user.service';
import { AuthService } from '../../../core/services/auth/auth.service';
import { CartService } from '../../../core/services/cart/cart.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
    selector: 'app-header',
    imports: [HlmButton, HlmIcon, HlmInput, NgIcon, RouterLink, ReactiveFormsModule, HlmAvatarImports],
    templateUrl: './header.html',
    styleUrl: './header.css',
    providers: [
        provideIcons({
            lucideLogIn,
            lucideUserPlus,
            lucideSearch,
            lucideLogOut,
            lucideShoppingCart,
        }),
    ],
})
export class Header {
    private router = inject(Router);
    private cartService = inject(CartService);
    authService = inject(AuthService);
    userService = inject(UserService);
    isAuthenticated: Signal<boolean> = this.authService.isAuthenticated;
    cartLength = this.cartService.cartLength;
    userInitials = computed(() => {
        const user = this.userService.currentUser();
        if (!user || !user.name) return '';
        const names = user.name.split(' ');
        if (names.length >= 2) {
            return (names[0][0] + names[names.length - 1][0]).toUpperCase();
        }
        return user.name.substring(0, 2).toUpperCase();
    });
    searchForm = new FormGroup({
        searchQuery: new FormControl(''),
    });

    logout() {
        this.authService.logout().subscribe({
            next: () => this.router.navigate(['/']),
        });
    }

    onSubmit() {
        const searchQuery = this.searchForm.get('searchQuery')?.value?.trim();
        if (!searchQuery) return;

        this.router.navigate(['/search', searchQuery]);
    }
}
