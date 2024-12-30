import { Component } from '@angular/core';
import { TaskService } from '../../core/task.service';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import Swal  from 'sweetalert2';
@Component({
  selector: 'app-task-list',
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css',
})
export class TaskListComponent {
  constructor(
    private taskService: TaskService,
    private toastr: ToastrService
   
  ) {}

  user: any = JSON.parse(sessionStorage.getItem('user') || '{}');

  tasks: any;

  ngOnInit() {
    // Call getTasks when the component is initialized (i.e., when the page loads)
    this.getTasks();
  }

  getTasks() {
    const user = this.user;
    const userId = user.id;
    console.log('Get tasks userid', user.id);

    this.taskService.getTasks(user.id).subscribe({
      next: (response: any) => {
        this.tasks = response;
        console.log(response);
      },
      error: (error) => console.log(console.log(error)),
    });
  }

  // editTask(taskId:string){
  //   alert(taskId)
  // }

  deleteTask(taskId: string) {
    // Use Swal directly without injecting it
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this task?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    }).then((result: { isConfirmed: boolean }) => {
      if (result.isConfirmed) {
        this.taskService.deleteTask(taskId).subscribe({
          next: () => {
            this.toastr.success('Task deleted successfully');
            this.getTasks();
          },
          error: () => this.toastr.error('Task deletion failed'),
        });
      }
    });
  }
}
