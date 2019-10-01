import { Pipe, PipeTransform } from '@angular/core';
import { Contact } from '../core/home/contact/contact.model';

@Pipe({
  name: 'tagFilter'
})
export class TagFilterPipe implements PipeTransform {

  transform(value: Array<Contact>, tag: string): any {
    let contacts: Contact[] = [];
    contacts = value.filter(contact => contact.tag == tag);
    return contacts;
  }

}
