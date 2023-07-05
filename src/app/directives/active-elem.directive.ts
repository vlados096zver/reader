import {Directive, ElementRef, HostBinding, HostListener, Input} from '@angular/core';

@Directive({
  selector: '[appActiveElem]'
})
export class ActiveElemDirective {
  @HostBinding('class.sortable') sortable = true;

}
