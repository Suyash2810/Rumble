import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {

  constructor() { }

  @HostBinding('class.open') toggleDropdown: boolean = false;

  @HostListener('click') click(event: Event) {
    this.toggleDropdown = !this.toggleDropdown;
  }
}
