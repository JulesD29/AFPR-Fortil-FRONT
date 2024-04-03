import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';
import { UserService } from '../user.service';


@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {

  messages: any[] = [];
  users: any[] = [];
  newMessageValue: string = '';
  selectedUserName: string = '';

  constructor(private messageService: MessageService, private userService: UserService) { }

  ngOnInit(): void {
    this.getMessages();
    this.getUsers();
  }

  getMessages(): void {
    this.messageService.getMessages()
    .subscribe(messages => {
      this.messages = messages.map(message => ({ ...message, editMode: false }));
    });
  }

  getUsers(): void {
    this.userService.getUsers()
      .subscribe(users => this.users = users);
  }

  findUserByName(userName: string): any {
    return this.users.find(user => 
      (user.firstName + ' ' + user.lastName).toLowerCase() === userName.toLowerCase()
    );
  }

  onSubmit(): void {
    const user = this.findUserByName(this.selectedUserName);
    if (user) {
      const newMessage = {
        value: this.newMessageValue,
        user: user
      };
      this.messageService.sendMessage(newMessage).subscribe(() => {
        this.getMessages();
        this.selectedUserName = '';
        this.newMessageValue = '';
      }, error => {
        console.error('Erreur lors de l\'ajout du message :', error);
      });
    } else {
      console.error('Utilisateur non trouvé.');
    }
  }

  toggleButtons(message: any) {
    message.showButtons = !message.showButtons;
    if (!message.showButtons) {
      message.editMode = false;
      this.getMessages(); 
    } else {
      message.editMode = true;
    }
  }
  
  editMessage(message: any) {
    const messageId = message.message_index;
    const updatedMessage = {
      value: message.value,
      user: message.user
    };
    this.messageService.editMessage(messageId, updatedMessage).subscribe(() => {
      console.log('Message modifié avec succès !');
      this.getMessages();
    }, error => {
      console.error('Erreur lors de la modification du message :', error);
    });
  }
  
  deleteMessage(message: any) {
    const messageId = message.message_index;
    this.messageService.deleteMessage(messageId).subscribe(() => {
      console.log('Message supprimé avec succès !');
      // Supprimer le message de la liste locale
      this.messages = this.messages.filter(m => m.message_index !== messageId);
    }, error => {
      console.error('Erreur lors de la suppression du message :', error);
    });
  }
  

}
