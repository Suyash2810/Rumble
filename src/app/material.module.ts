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
    MatDividerModule
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
        MatDividerModule
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
        MatDividerModule
    ]
})

export class MaterialModule {

}