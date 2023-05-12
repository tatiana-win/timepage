import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CONFIG } from '../../../../config';
import { Note } from '../../../models/note.model';
import { v4 as uuid } from 'uuid';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  constructor(private http: HttpClient) { }
  getNotes(from?: string, to?: string): Observable<any> {
    return this.http.get(`${CONFIG.apiUrl}/notes`, {
      params: !!from && !!to ? {
        from,
        to
      } : {},
      ...httpOptions
    });
  }

  createNote(note: Omit<Note, 'id'>): Observable<any> {
    const data: Note = {
      ...note,
      id: uuid()
    }
    return this.http.post(`${CONFIG.apiUrl}/notes`, data, httpOptions);
  }

  updateNote(note: Note): Observable<any> {
    return this.http.patch(`${CONFIG.apiUrl}/notes/${note.id}`, note, httpOptions);
  }

  deleteNote(note: Note): Observable<any> {
    return this.http.delete(`${CONFIG.apiUrl}/notes/${note.id}`, httpOptions);
  }
}
