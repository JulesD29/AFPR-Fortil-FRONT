import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tag } from './tags-list/Tag';

@Injectable({
  providedIn: 'root'
})
export class TagService {
  private apiUrl = 'http://localhost:8085/tags-api/tags'; 


  
  constructor(private http: HttpClient) { }

  getTags(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl); // Effectue une requête GET pour récupérer les tags depuis l'API
  }

  addTag(newTag: Tag): Observable<any> {
    return this.http.post(this.apiUrl, newTag);
  }

  updateTag(tagId: number, updatedTag: Tag): Observable<any> {
    return this.http.put(`${this.apiUrl}/${tagId}`, updatedTag);
  }

  deleteTag(tagId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${tagId}`);
  }
}

