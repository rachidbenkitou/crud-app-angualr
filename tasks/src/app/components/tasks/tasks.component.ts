import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/models/task';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})

export class TasksComponent implements OnInit{
  tasks: Task[]=[];
  myTask: Task= {
    label:'',
    completed:false
  }
  editForm:boolean=false;
  showForm=false;
  constructor(private taskService: TaskService){}

  ngOnInit() {
    this.getTasks();
  }

  getTasks(){
    this.taskService.findAll()
        .subscribe(tasks=> this.tasks=tasks)
  }

  deleteTask(id: number):void{
    this.taskService.delete(id)
        .subscribe(()=>{
            this.tasks=this.tasks.filter(task=> task.id!=id);
        })   
  }

  persistTask(){
    this.taskService.persist(this.myTask)
        .subscribe((task) => {
          this.tasks=[task, ...this.tasks];
          this.resetTask();
          this.showForm=false;
        });
  }

  resetTask(){
    this.myTask= {
      label: '',
      completed: false
    }
  }

  toggleCompleted(task:Task){
    if (!task.id) {
      console.log("The Is is Undefined.");
      return;
    }
    this.taskService.completed(task.id, task.completed)
        .subscribe(() =>{
          task.completed=!task.completed;
        } )
  }

  editTask(task:Task){
    this.myTask= task;
    this.editForm=true;
    this.showForm=true;
  }

  updateTask() {
    this.taskService.update(this.myTask)
      .subscribe(task => {
        this.resetTask();
        this.editForm = false;
        this.showForm=false;
      });
  }
  



}
