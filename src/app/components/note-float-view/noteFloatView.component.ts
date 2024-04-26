import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Note } from "../interfaces/note.interface";
import { MatSnackBar } from "@angular/material/snack-bar";
import { DialogServiceService } from "src/app/services/DialogService.service";
import { NoteUpdate } from "../interfaces/note-update.interface";
import { animate, state, style, transition, trigger } from "@angular/animations";

@Component({
  selector: 'app-note-float-view',
  templateUrl: './noteFloatView.component.html',
  styleUrls: ['./noteFloatView.component.css'],
  animations: [
    trigger('scaleOutTr',[
      state('false', style({ transform: 'scale(1)', opacity: 1 })),
      state('true', style({ transform: 'scale(0)',  opacity: 0 })),
      transition('false => true', animate('0.5s cubic-bezier(0.550, 0.085, 0.680, 0.530)')),
    ]),
  ]
})
export class NoteFloatView{

  @Input() notes : Note[] = [];
  @Output() notesChanged : EventEmitter<Note[]> = new EventEmitter<Note[]>();
  @Output() deletedNote : EventEmitter<Note> = new EventEmitter<Note>();

  public closing = false;
  public idClosing = '';

  constructor ( private _snackBar: MatSnackBar, private dialogService : DialogServiceService ){}

  closeNote( note : Note ){
    const id = this.notes.findIndex( element => element._id === note._id );
    this.idClosing = note._id!;
    this.closing = true;
    setTimeout(()=> {
      this.notesChanged.emit(this.notes);
      this.notes.splice(id,1);
      this.closing = false;
    },300)
  }

  openSnackBar( msg : string ){
    this._snackBar.open(msg, '', {duration:1000});
  }

  cancelEditNote(note : Note){
    note.editable = false;
    note.title = note.originalTitle!;
    note.content = note.originalContent!;
  }

  async deleteNote( note : Note ){
    (await this.dialogService.deleteNote(note)).subscribe(
      (res) => {
        this.openSnackBar('Nota eliminada');
        this.closeNote(note);
        this.deletedNote.emit(note);
      }
    )
  }

  async saveChanges( note : Note ){
    (await this.dialogService.updateNote(note as NoteUpdate)).subscribe(
      (res)=> {
        note.originalTitle = note.title;
        note.originalContent = note.content;
        note.editable = false;
        this.openSnackBar('Nota actualizada!');
      },
      (err) => {
        this.openSnackBar('Error: ' + err.error.message);
      }
    )
  }

}
