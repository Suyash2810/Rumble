import { NgModule } from "@angular/core";
import { DropdownDirective } from "./dropdown.directive";
import { CommonModule } from "@angular/common";
import { SafeHTMLPipe } from './safe-html.pipe';
import { ToggleMessagePipe } from './toggle-message.pipe';

@NgModule({
    declarations: [
        DropdownDirective,
        SafeHTMLPipe,
        ToggleMessagePipe
    ],
    exports: [
        CommonModule,
        DropdownDirective,
        SafeHTMLPipe,
        ToggleMessagePipe
    ]
})

export class SharedModule { }