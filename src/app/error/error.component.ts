import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material";

@Component({
    templateUrl: './error.component.html'
})

export class ErrorComponent {
    errorMessage: string = "An unknown error has occoured.";


    constructor(@Inject(MAT_DIALOG_DATA) public data: {message: string}) {
        this.errorMessage = data.message;
    }
}