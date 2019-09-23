import { NgModule } from "@angular/core";
import {
    MatInputModule,
    MatCardModule,
    MatToolbarModule,
    MatExpansionModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatDialogModule,
    MatSidenavModule,
    MatDividerModule,
    MatSlideToggleModule,
    MatTooltipModule
} from '@angular/material';

@NgModule({
    imports: [
        MatInputModule,
        MatCardModule,
        MatToolbarModule,
        MatExpansionModule,
        MatButtonModule,
        MatProgressSpinnerModule,
        MatPaginatorModule,
        MatDialogModule,
        MatSidenavModule,
        MatDividerModule,
        MatSlideToggleModule,
        MatTooltipModule
    ],
    exports: [
        MatInputModule,
        MatCardModule,
        MatToolbarModule,
        MatExpansionModule,
        MatButtonModule,
        MatProgressSpinnerModule,
        MatPaginatorModule,
        MatDialogModule,
        MatSidenavModule,
        MatDividerModule,
        MatSlideToggleModule,
        MatTooltipModule
    ]
})

export class MaterialModule {

}