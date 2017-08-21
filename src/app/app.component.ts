import { Component, OnInit } from '@angular/core';
import { TaskService } from './task.service';
import { Observable } from 'rxjs/Observable'
import { Task } from './Task'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [TaskService]
})
export class AppComponent implements OnInit {
  title = 'This app is works!';
  tasks: Task[];

  constructor(private taskService: TaskService) {
  }
  ngOnInit() {
    this.getAllTasks()
  }
  getAllTasks() {
    this.taskService
      .getAllTasks()
      .subscribe((tasks) => {
        this.tasks = tasks;
      });
  }
  createTask(description: string) {
    this.taskService
      .createTask(description)
      //sulution 3 hard code but good
      .mergeMap((task): Observable<Task[]> => {
        return this.taskService.getAllTasks();
      })
      .subscribe((tasks) => {
        this.tasks = tasks;
        //solution 1 easy but not good
        //this.tasks.push(task);
        //solution 2 easy and good but chain code
        //this.getAllTasks();
      });

  }
}
