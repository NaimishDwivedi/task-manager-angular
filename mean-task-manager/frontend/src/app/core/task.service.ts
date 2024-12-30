import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = 'http://localhost:5000/api/tasks';

  constructor(private http: HttpClient) {}

  getTasks(userId: string) {
    const params = new HttpParams().set('userId', userId); // Append userId as a query parameter
    return this.http.get(`${this.apiUrl}`, { params });
  }

  getTasksToEdit(taskId: string) {
    console.log('Task service taskId:', taskId);
    return this.http.get(`${this.apiUrl}/${taskId}`, {});
  }

  createTask(title: string, description: string, userId: string) {
    console.log('taskService', title, description, userId);

    return this.http.post(`${this.apiUrl}`, { title, description, userId });
  }

  updateTask(taskId: string, updatedTask: any) {
    return this.http.put(`${this.apiUrl}/${taskId}`, updatedTask);
  }

  deleteTask(id: string) {
    console.log(id);

    return this.http.delete(`${this.apiUrl}/${id}`, {});
  }
}
