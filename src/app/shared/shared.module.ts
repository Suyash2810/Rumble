import { NgModule } from "@angular/core";
import { DropdownDirective } from "./dropdown.directive";
import { CommonModule } from "@angular/common";
import { SafeHTMLPipe } from './safe-html.pipe';
    
@NgModule({
declarations: [
    DropdownDirective,
    SafeHTMLPipe
],
    exports: [
        CommonModule,
        DropdownDirective,
        SafeHTMLPipe
    ]
})

export class SharedModule { }