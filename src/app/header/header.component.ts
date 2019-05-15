import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {

    @Output() selectedItem  = new EventEmitter<string>();

    onSelect(data: string) {
        this.selectedItem.emit(data);
    }
}
