import { Component, NgModule } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { CommonModule } from '@angular/common';
import { TaskFormComponent } from './tasks/task-form/task-form.component';
import { TaskListComponent } from './tasks/task-list/task-list.component';
import { EditTaskComponent } from './tasks/edit-task/edit-task.component';

@Component({
  selector: 'app-root',
  standalone:true,
  imports: [RouterOutlet,RouterLink,LoginComponent,RegisterComponent,TaskFormComponent,TaskListComponent,EditTaskComponent,CommonModule],
  templateUrl: './app.component.html',
  styleUrls:[ './app.component.css']
})
export class AppComponent {
  title = 'frontend';
}
