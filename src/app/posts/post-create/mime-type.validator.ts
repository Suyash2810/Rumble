import { AbstractControl } from "@angular/forms";
import { Observable, Observer } from "rxjs";

export const mimeType = (
    control: AbstractControl
): Promise<{ [key: String]: any }> | Observable<{ [key: String]: any }> => {

    const file = control.value as File;
    const reader = new FileReader();
    const rdObs = Observable.create(
        (observer: Observer<{ [key: String]: any }>) => {

            reader.addEventListener('loadend', () => {

            });

            reader.readAsArrayBuffer(file);
        }
    )

}