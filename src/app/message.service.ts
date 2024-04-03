import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private apiUrlMessages = 'http://localhost:8085/messages-api/messages';
  private apiUrlUsers = 'http://localhost:8085/users-api/users';

  constructor(private http: HttpClient) { }

  getMessages(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrlMessages);
  }

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrlUsers);
  }

  sendMessage(messageData: any): Observable<any> {
    return this.http.post<any>(this.apiUrlMessages, messageData);
  }

  editMessage(id: number, updatedMessage: any) {
    return this.http.put(`${this.apiUrlMessages}/${id}`, updatedMessage);
  }

  deleteMessage(id: number){
    return this.http.delete(`${this.apiUrlMessages}/${id}`);
  }
}
