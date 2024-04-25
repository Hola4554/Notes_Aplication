import { AfterViewInit, Component, EventEmitter, Input, Output } from "@angular/core";
import { Note } from "../interfaces/note.interface";

@Component({
  selector: 'app-note-float-view',
  templateUrl: './noteFloatView.component.html',
  styleUrls: ['./noteFloatView.component.css']
})
export class NoteFloatView{

  @Input() notes : Note[] = [];
  @Output() notesChanged : EventEmitter<Note[]> = new EventEmitter<Note[]>();

  coseNote( note : Note ){
    const id = this.notes.findIndex( element => element._id === note._id );
    this.notes.splice(id,1);
    this.notesChanged.emit(this.notes);
  }

}
