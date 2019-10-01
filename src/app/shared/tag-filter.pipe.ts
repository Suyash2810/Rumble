import { Pipe, PipeTransform } from '@angular/core';
import { Contact } from '../core/home/contact/contact.model';
import { isNullOrUndefined } from 'util';

@Pipe({
  name: 'tagFilter'
})
export class TagFilterPipe implements PipeTransform {

  transform(value: Array<Contact>, tag: string): any {
    if (tag === " " || isNullOrUndefined(tag) || tag.length === 0 ) {
      return value;
    }
    else {
      let contacts: Contact[] = [];
      contacts = value.filter(contact => contact.tag.toLowerCase() == tag.toLowerCase());
      return contacts;
    }
  }

}
