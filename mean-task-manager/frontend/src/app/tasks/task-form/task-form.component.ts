import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { TaskListComponent } from '../task-list/task-list.component';
import { TaskService } from '../../core/task.service';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { Location } from '@angular/common';

@Component({
  selector: 'app-task-form',
  imports: [FormsModule, RouterOutlet, RouterLink],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css',
})
export class TaskFormComponent {
  constructor(
    private taskService: TaskService,
    private toastr: ToastrService,
    private location: Location
  ) {}

  user: any = JSON.parse(sessionStorage.getItem('user') || '{}');

  createTask(taskData: NgForm) {
    const formValues = taskData.value;
    const user = this.user;
    const userId = user.id;
    // console.log(this.user.id);

    this.taskService
      .createTask(formValues.taskname, formValues.taskdescription, user.id)
      .subscribe({
        next: (response: any) => {
          // console.log(response);

          this.toastr.success('Task added successfully');
          this.location.back();
        },
        error: () => this.toastr.error('Task addition failed'),
      });
  }
}
