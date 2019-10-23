import { NgModule } from "@angular/core";
import { DropdownDirective } from "./dropdown.directive";
import { CommonModule } from "@angular/common";
import { SafeHTMLPipe } from './safe-html.pipe';
import { ToggleMessagePipe } from './toggle-message.pipe';
import { TagFilterPipe } from './tag-filter.pipe';
import { SubStrPipe } from './sub-str.pipe';

@NgModule({
    declarations: [
        DropdownDirective,
        SafeHTMLPipe,
        ToggleMessagePipe,
        TagFilterPipe,
        SubStrPipe
    ],
    exports: [
        CommonModule,
        DropdownDirective,
        SafeHTMLPipe,
        ToggleMessagePipe,
        TagFilterPipe
    ]
})

export class SharedModule { }