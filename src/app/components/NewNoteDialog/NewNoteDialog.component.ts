import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, HostListener, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-new-note-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule
  ],
  templateUrl: './NewNoteDialogComponent.component.html',
  styleUrls: ['./NewNoteDialog.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewNoteDialogComponent {

  @Output() dialogExit = new EventEmitter<boolean>();

  public colorNote = 'var(--note-blue)';

  handleClick(event: MouseEvent, value: boolean) {
    if (event.target === event.currentTarget) {
      // Solo se ejecuta si el objetivo del clic es el contenedor principal
      this.closeDialog(value);
    }
  }

  closeDialog( value : boolean ) {
    this.dialogExit.emit(value);
  }

  @HostListener('document:keydown.escape', ['$event'])
  handleEscapeKey() {
    this.closeDialog(false);
  }

  cancelNote(){
    this.closeDialog(false);
  }

  saveNote(){
    this.closeDialog(false);
  }

}
