import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Note } from "../interfaces/note.interface";
import { MatSnackBar } from "@angular/material/snack-bar";
import { DialogServiceService } from "src/app/services/DialogService.service";
import { NoteUpdate } from "../interfaces/note-update.interface";

@Component({
  selector: 'app-note-float-view',
  templateUrl: './noteFloatView.component.html',
  styleUrls: ['./noteFloatView.component.css']
})
export class NoteFloatView{

  @Input() notes : Note[] = [];
  @Output() notesChanged : EventEmitter<Note[]> = new EventEmitter<Note[]>();
  @Output() deletedNote : EventEmitter<Note> = new EventEmitter<Note>();

  constructor ( private _snackBar: MatSnackBar, private dialogService : DialogServiceService ){}

  closeNote( note : Note ){
    const id = this.notes.findIndex( element => element._id === note._id );
    this.notes.splice(id,1);
    this.notesChanged.emit(this.notes);
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
