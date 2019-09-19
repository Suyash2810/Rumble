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
    MatSidenavModule
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
        MatSidenavModule
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
        MatSidenavModule
    ]
})

export class MaterialModule {

}