import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: 'input[type="number"]'
})
export class DisableScrollDirective {
  @HostListener('wheel', ['$event'])
  onWheel(event: WheelEvent): void {
    const target = event.target as HTMLInputElement;
    target.blur();
  }
}
