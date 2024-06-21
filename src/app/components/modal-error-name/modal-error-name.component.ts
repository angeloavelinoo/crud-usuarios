import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal-error-name',
  templateUrl: './modal-error-name.component.html',
  styleUrl: './modal-error-name.component.scss'
})
export class ModalErrorNameComponent {
  @Input() message: string;
  @Output() close = new EventEmitter<void>();

  onClose(){
    this.close.emit();
  }
}
