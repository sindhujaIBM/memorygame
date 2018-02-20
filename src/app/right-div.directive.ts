import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appRightDiv]'
})
export class RightDivDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
