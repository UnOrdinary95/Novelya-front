import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HlmField, HlmFieldGroup, HlmFieldLabel } from '@spartan-ng/helm/field';
import { HlmInput } from '@spartan-ng/helm/input';
import { HlmButton } from '@spartan-ng/helm/button';

@Component({
    selector: 'app-login-form',
    imports: [HlmField, HlmFieldGroup, HlmFieldLabel, HlmInput, HlmButton, RouterLink],
    templateUrl: './login-form.html',
    styleUrl: './login-form.css',
})
export class LoginForm {

}
