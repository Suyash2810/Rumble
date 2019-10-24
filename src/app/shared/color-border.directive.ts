import { Directive, OnInit, Input, Renderer2, ElementRef } from '@angular/core';
import { rendererTypeName } from '@angular/compiler';

@Directive({
  selector: '[appColorBorder]'
})
export class ColorBorderDirective implements OnInit {

  constructor(private renderer: Renderer2, private elementref: ElementRef) { }

  @Input() borderColor: string;

  ngOnInit() {
    this.renderer.setStyle(this.elementref.nativeElement, 'border', `1px solid ${this.borderColor}`);
  }
}
