import { NgModule } from "@angular/core";
import {
    MatInputModule,
    MatCardModule,
    MatToolbarModule,
    MatExpansionModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatDialogModule
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
    ]
})

export class MaterialModule {

}