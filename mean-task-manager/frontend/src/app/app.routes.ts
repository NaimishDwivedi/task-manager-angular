import { Routes } from '@angular/router';
import { TaskFormComponent } from './tasks/task-form/task-form.component';
import { TaskListComponent } from './tasks/task-list/task-list.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { EditTaskComponent } from './tasks/edit-task/edit-task.component';

export const routes: Routes = [
    {path:'',component:RegisterComponent},
    {path:'login',component:LoginComponent},
    {path:'createTask/:userId',component:TaskFormComponent},
    {path:'showTasks/:userId',component:TaskListComponent},
    {path:'edit/:userId/:taskId',component:EditTaskComponent},
];
