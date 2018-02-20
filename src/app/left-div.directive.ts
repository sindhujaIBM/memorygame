import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appLeftDiv]'
})
export class LeftDivDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
