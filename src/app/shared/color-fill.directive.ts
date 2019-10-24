import { Directive, Input, Renderer2, OnInit, ElementRef } from '@angular/core';

@Directive({
  selector: '[appColorFill]'
})
export class ColorFillDirective implements OnInit {

  constructor(private renderer: Renderer2, private elementRef: ElementRef) { }

  @Input() setColor: string;

  ngOnInit() {
    this.renderer.setStyle(this.elementRef.nativeElement, 'backgroundColor', this.setColor);
  }
}
