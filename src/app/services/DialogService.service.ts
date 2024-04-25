import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Note } from '../components/interfaces/note.interface';

import { HttpClient } from '@angular/common/http';
import { NoteUpdate } from '../components/interfaces/note-update.interface';

@Injectable({
  providedIn: 'root'
})
export class DialogServiceService {

  constructor( private http : HttpClient ) { }

  private URL : string =  environment.domain + 'notes';

  async createNote( note : Note ){
    return await this.http.post( this.URL, note );
  }

  async getAllNotes () {
    return await this.http.get( this.URL );
  }

  async updateNote ( note : NoteUpdate ) {
    return await this.http.put( this.URL + `/update/${note._id}`, note );
  }

}
