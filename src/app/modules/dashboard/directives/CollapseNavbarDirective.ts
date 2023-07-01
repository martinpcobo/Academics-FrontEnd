import {Directive, ElementRef, HostListener} from "@angular/core";

@Directive({
  selector: '[navbarCollapseDirective]'
})
export class CollapseNavbarDirective {
  constructor(private element: ElementRef) {

  }

  @HostListener('mouseenter') onMouseEnter() {
    this.collapseNavbar(false);
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.collapseNavbar(true);
  }

  private collapseNavbar(collapsed: boolean) {
    if (collapsed) {
      this.element.nativeElement.classList.remove('navbar-not-collapsed');
      this.element.nativeElement.classList.add('navbar-collapsed');
    } else {
      this.element.nativeElement.classList.remove('navbar-collapsed');
      this.element.nativeElement.classList.add('navbar-not-collapsed');
    }
  }
}
