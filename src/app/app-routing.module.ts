import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MessageListComponent } from './message-list/message-list.component';
import { HomeComponent } from './home/home.component';
import { UserListComponent } from './user-list/user-list.component';
import { TagsListComponent } from './tags-list/tags-list.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'messages', component: MessageListComponent },
  { path: 'users', component: UserListComponent },
  { path: 'tags', component: TagsListComponent },

  // Autres routes...
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
