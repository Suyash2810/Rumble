import { Pipe, PipeTransform } from '@angular/core';
import { Contact } from '../core/home/contact/contact.model';

@Pipe({
  name: 'toggleMessage'
})
export class ToggleMessagePipe implements PipeTransform {

  transform(value: Contact[], toggle: boolean, userId: string): Contact[] {
    if (!toggle) {
      return value;
    } else {
      let filterContacts: Contact[] = [];
      filterContacts = value.filter(contact => contact.creator_id == userId);
      return filterContacts;
    }
  }

}
