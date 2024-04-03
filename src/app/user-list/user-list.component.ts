import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

import { User } from './User';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent implements OnInit {

  showCreate: boolean = false;
  showUpdate: boolean = false;
  showDelete: boolean = false;

  showCreateForm() {
    this.showCreate = true;
    this.showUpdate = false;
    this.showDelete = false;
  }

  showUpdateForm() {
    this.showCreate = false;
    this.showUpdate = true;
    this.showDelete = false;
  }

  showDeleteForm() {
    this.showCreate = false;
    this.showUpdate = false;
    this.showDelete = true;
  }

  users: any[] = [];
  newUser = { firstName: '', lastName: '', mail: '', password: '', role: '' }; // Nouvel utilisateur à ajouter
  selectedRole: string = 'ROLE_USER'; // Par défaut, sélectionnez le rôle "User"

  selectedUser: User = { firstName: '', lastName: '', mail: '', password: '', role: '' };
  selectedUserId: number = 0;
  searchError: string | null = null; // Ajoutez une propriété pour stocker les erreurs de recherche

  userIdToDelete: number | undefined;

  deleteMessage: string = '';

  constructor(
    private userService: UserService
    ) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getUsers()
      .subscribe(users => this.users = users);
  }

  getUserById() {
    this.userService.getUserById(this.selectedUserId).subscribe(
      (user: User) => {
        this.selectedUser = user;
        this.searchError = null;
      },
      error => {
        console.error('Erreur lors de la récupération de l\'utilisateur', error);
        this.searchError = 'Utilisateur non trouvé'; // Définissez le message d'erreur
      }
    );
  }

  onSubmit(): void {
    // Vérifier si les champs requis sont remplis
    if (!this.newUser.firstName || !this.newUser.lastName || !this.newUser.mail || !this.newUser.password || !this.selectedRole) {
      alert('Veuillez remplir tous les champs.');
      return; // Empêcher la soumission du formulaire si des champs requis sont vides
    }

    // Appelez la méthode du service pour ajouter un nouvel utilisateur
    this.userService.addUser(this.newUser)
      .subscribe(
        response => {
          console.log('Utilisateur ajouté avec succès !', response);
          alert('Utilisateur ajouté avec succès !');
          // Réinitialisez les champs du formulaire après l'ajout
          this.newUser = { firstName: '', lastName: '', mail: '', password: '', role: '' };
  
          // Actualisez la liste des utilisateurs après l'ajout réussi
          this.userService.getUsers().subscribe(
            (data) => {
              this.users = data;
            },
            (error) => {
              console.error('Erreur lors du rafraîchissement des données :', error);
            }
          );
        },
        error => {
          console.error('Erreur lors de l\'ajout de l\'utilisateur :', error);
        }
      );
  }
  

  onUpdate(): void {
    // Appelez la méthode du service pour mettre à jour l'utilisateur
    this.userService.updateUser(this.selectedUserId, this.selectedUser)
      .subscribe(
        response => {
          console.log('Utilisateur modifié avec succès !', response);
          alert('Utilisateur modifié avec succès !');
          // Réinitialisez les champs du formulaire après la modification
          this.selectedUser = { firstName: '', lastName: '', mail: '', password: '', role: '' };
          this.selectedUserId = 0;
          this.searchError = null;

          // Actualisez la liste des utilisateurs après l'ajout réussi
          this.userService.getUsers().subscribe(
            (data) => {
              this.users = data;
            },
            (error) => {
              console.error('Erreur lors du rafraîchissement des données :', error);
            }
          );
        },
        error => {
          console.error('Erreur lors de la modification de l\'utilisateur :', error);
        }
      );
  }

  onDelete() {
    if (this.userIdToDelete) {
      this.userService.deleteUser(this.userIdToDelete).subscribe(
        () => {
          this.deleteMessage = `L'utilisateur avec l'ID ${this.userIdToDelete} a été supprimé avec succès.`;
          // Actualiser la liste des utilisateurs après la suppression réussie
          this.getUsers();
        },
        (error) => {
          this.deleteMessage = `Erreur lors de la suppression de l'utilisateur : ${error}`;
        }
      );
    } else {
      this.deleteMessage = 'Veuillez sélectionner un utilisateur à supprimer.';
    }
  }
}  


