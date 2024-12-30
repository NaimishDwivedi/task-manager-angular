import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink, RouterOutlet, ActivatedRoute } from '@angular/router';
import { TaskService } from '../../core/task.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule, Location } from '@angular/common';

@Component({
  selector: 'app-edit-task',
  imports: [FormsModule, RouterOutlet, RouterLink, CommonModule],
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css'],
})
export class EditTaskComponent {
  user: any;
  tasks: any;

  taskId: any;

  constructor(
    private taskService: TaskService,
    private toastr: ToastrService,
    private location: Location,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.taskId = params['taskId'];
      // console.log('Task ID:', this.taskId);
    });

    this.getTasks();
  }

  getTasks() {
    const taskId = this.taskId;
    console.log(taskId);

    this.taskService.getTasksToEdit(taskId).subscribe({
      next: (response: any) => {
        this.tasks = response;
        // console.log(response);
      },
      error: (error) => console.log(error),
    });
  }

  updateTask(taskData: NgForm) {
    const updatedTask = taskData.value; // Get the updated values from the form
    console.log('Updated Task:', updatedTask);

    this.taskService.updateTask(this.taskId, updatedTask).subscribe({
      next: (response: any) => {
        // console.log('Update Response:', response);
        
        this.toastr.success('Task updated successfully!');
        this.location.back();
        this.getTasks();
      },
      error: (error) => {
        // console.log('Update Error:', error);
        this.toastr.error('Failed to update the task.');
      },
    });
  }
}
