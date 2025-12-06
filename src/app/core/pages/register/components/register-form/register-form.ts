import { Component } from '@angular/core';
import { HlmField, HlmFieldGroup, HlmFieldLabel } from '@spartan-ng/helm/field';
import { HlmInput } from '@spartan-ng/helm/input';
import { HlmCheckbox } from '@spartan-ng/helm/checkbox';
import { HlmButton } from '@spartan-ng/helm/button';
import { RouterLink } from "@angular/router";

@Component({
    selector: 'app-register-form',
    imports: [HlmField, HlmFieldGroup, HlmFieldLabel, HlmInput, HlmCheckbox, HlmButton, RouterLink],
    templateUrl: './register-form.html',
    styleUrl: './register-form.css',
})
export class RegisterForm {

}
