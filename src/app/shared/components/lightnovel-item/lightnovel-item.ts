import { Component, input, computed, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HlmBadgeImports } from '@spartan-ng/helm/badge';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { LightNovel } from '@core/models/LightNovel';
import { lucideStar, lucideShoppingCart } from '@ng-icons/lucide';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { HlmButton } from '@spartan-ng/helm/button';
import { HlmIcon } from '@spartan-ng/helm/icon';

@Component({
    selector: 'app-lightnovel-item',
    imports: [CommonModule, CurrencyPipe, RouterLink, HlmBadgeImports, HlmCardImports, NgIcon, HlmButton, HlmIcon],
    templateUrl: './lightnovel-item.html',
    styleUrl: './lightnovel-item.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        provideIcons({
            lucideStar,
            lucideShoppingCart,
        }),
    ]
})
export class LightnovelItem {
    lightNovel = input.required<LightNovel>();
    isOutOfStock = computed(() => !this.lightNovel().inStock);
}
