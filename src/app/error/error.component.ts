import { Component } from "@angular/core";

@Component({
    templateUrl: './error.component.html'
})

export class ErrorComponent {
    errorMessage: string = "An unknown error has occoured.";
}