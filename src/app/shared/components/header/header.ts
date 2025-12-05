import { Component } from '@angular/core';
import { HlmButton } from '@spartan-ng/helm/button';
import { HlmIcon } from '@spartan-ng/helm/icon';
import { HlmInput } from '@spartan-ng/helm/input';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideLogIn, lucideUserPlus, lucideSearch } from '@ng-icons/lucide';

@Component({
    selector: 'app-header',
    imports: [HlmButton, HlmIcon, HlmInput, NgIcon],
    templateUrl: './header.html',
    styleUrl: './header.css',
    providers: [provideIcons({ lucideLogIn, lucideUserPlus, lucideSearch })],
})
export class Header {

}
