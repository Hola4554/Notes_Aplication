import { Component } from '@angular/core';
import { DialogServiceService } from './services/DialogService.service';
import { Note } from './components/interfaces/note.interface';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { NoteUpdate } from './components/interfaces/note-update.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'notesFirebaseProyect';

  public showDialogNewNote = false;

  constructor( private dialogService : DialogServiceService ) { }

  public panelOpenState = false;

  public lista1 : Note[] = [];
  public lista2 : Note[] = [];

  public oppenedNotes : Note[] =[];

  async start(){
    this.lista1 = [];
    this.lista2 = [];
    (await this.dialogService.getAllNotes()).subscribe(
      (res : any) => {
        res.forEach((note:Note)=> {
          if ( note.list === '1' ) this.lista1.push(note)
          if ( note.list === '2' ) this.lista2.push(note)
        })
      }
    )
  }

  openNote( note : Note ){
    this.oppenedNotes.push(note)
  }

  isItemOpened(item: any): boolean {
    return this.oppenedNotes.includes(item);
  }

  ngOnInit(): void {
    this.start();
  }

  addNote(){
    this.showDialogNewNote = true;
  }

  async drop(event: CdkDragDrop<Note[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );

      if (event.previousContainer.id === 'cdk-drop-list-0'){
        event.container.data[event.currentIndex].list = '1';
      } else {
        event.container.data[event.currentIndex].list = '2';
      }

      (await this.dialogService.updateNote(event.container.data[event.currentIndex] as NoteUpdate)).subscribe(
        (res) => {console.log(res)},
        (err) => {console.log(err)}
      )

      console.log(event.previousContainer.id);
      console.log(event.container.id);


    }


  }
}
