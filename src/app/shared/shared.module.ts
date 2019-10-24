import { NgModule } from "@angular/core";
import { DropdownDirective } from "./dropdown.directive";
import { CommonModule } from "@angular/common";
import { SafeHTMLPipe } from './safe-html.pipe';
import { ToggleMessagePipe } from './toggle-message.pipe';
import { TagFilterPipe } from './tag-filter.pipe';
import { SubStrPipe } from './sub-str.pipe';
import { ColorFillDirective } from './color-fill.directive';
import { ColorBorderDirective } from './color-border.directive';

@NgModule({
    declarations: [
        DropdownDirective,
        SafeHTMLPipe,
        ToggleMessagePipe,
        TagFilterPipe,
        SubStrPipe,
        ColorFillDirective,
        ColorBorderDirective
    ],
    exports: [
        CommonModule,
        DropdownDirective,
        SafeHTMLPipe,
        ToggleMessagePipe,
        TagFilterPipe,
        SubStrPipe,
        ColorFillDirective,
        ColorBorderDirective
    ]
})

export class SharedModule { }