import { Directive, ElementRef, Input, HostListener } from '@angular/core';

@Directive({
  selector: '[appGlow]',
  standalone: true
})
export class GlowDirective {
  @Input() appGlow: string = '#FFD700';

  constructor(private el: ElementRef) {}

  @HostListener('mouseenter') onMouseEnter() {
    this.glow(this.appGlow);
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.glow(null);
  }

  private glow(color: string | null) {
    this.el.nativeElement.style.boxShadow = color 
      ? `0 0 20px ${color}`
      : 'none';
    this.el.nativeElement.style.transition = 'box-shadow 0.3s ease';
  }
}