import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared.module';
import { NewNoteDialogComponent } from './components/NewNoteDialog/NewNoteDialog.component';
import { HttpClientModule } from '@angular/common/http';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NoteFloatView } from './components/note-float-view/noteFloatView.component';

@NgModule({
  declarations: [
    AppComponent,
    NoteFloatView
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    NewNoteDialogComponent,
    HttpClientModule,
    DragDropModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
