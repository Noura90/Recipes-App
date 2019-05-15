import { Directive, ElementRef, HostListener, HostBinding } from '@angular/core';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {

  @HostBinding('class') openClass : string = ''; 

  constructor() { }


  @HostListener('click') onDropDownClick(){
    if (this.openClass === ''){
      this.openClass = 'open';
    }else {
      this.openClass = '';
    }
    

  }

  @HostListener('mouseleave') onDropDownLeave(){
    this.openClass = '';
  }

}
