import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'subStr'
})
export class SubStrPipe implements PipeTransform {

  transform(value: string, len: number): string {
    if (value.length < len) {
      return value;
    } else {
      return value.substr(0, len) + '...';
    }
  }

}
