import { CommonModule } from '@angular/common';
import { Component, EventEmitter, HostListener, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { DialogServiceService } from '../../services/DialogService.service';
import { SharedModule } from 'src/app/shared.module';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Note } from '../interfaces/note.interface';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-new-note-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    SharedModule,
  ],
  templateUrl: './NewNoteDialogComponent.component.html',
  styleUrls: ['./NewNoteDialog.component.css'],
  animations: [
    trigger('scaleOutTr',[
      state('false', style({ transform: 'scale(1)', opacity: 1 })),
      state('true', style({ transform: 'scale(0)',  opacity: 0 })),
      transition('false => true', animate('0.5s cubic-bezier(0.550, 0.085, 0.680, 0.530)')),
    ]),
  ]
})
export class NewNoteDialogComponent {

  constructor( private dialogService : DialogServiceService, private _snackBar: MatSnackBar ){}

  @Output() dialogExit = new EventEmitter<boolean>();
  @Output() noteCreated = new EventEmitter<Note>();

  public colorNote = 'var(--note-blue)';
  public closing = false;

  public title: string = '';
  public content: string = '';

  handleClick(event: MouseEvent, value: boolean) {
    if (event.target === event.currentTarget) {
      this.closeDialog(value);
    }
  }

  closeDialog( value : boolean ) {
    this.closing = true;
    setTimeout(()=> {
      this.dialogExit.emit(value);
      this.closing = false;
    },300)
  }

  @HostListener('document:keydown.escape', ['$event'])
  handleEscapeKey() {
    this.closeDialog(false);
  }

  @HostListener('document:keydown.enter', ['$event'])
  handleEnterKey() {
    this.saveNote();
  }

  cancelNote(){
    this.closeDialog(false);
  }

  lunchSnackBar( message: string) {
    this._snackBar.open(message, '', {duration:1800});
  }

  async saveNote(){
    if (this.title === '') {this.lunchSnackBar('Título nescesario'); return}

    const note : Note = {title: this.title, content: this.content, color: this.colorNote, list:'1'};
    await (await this.dialogService.createNote(note)).subscribe(
      (res : any) => {
        this.closeDialog(false);
        this.lunchSnackBar('Nota creada');
        this.noteCreated.emit(res);
      },
      (err) => {
        this.lunchSnackBar(err.error.message);
      }
    )
  }

}
