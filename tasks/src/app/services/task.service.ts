import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  apiUrl="http://localhost:5000/tasks";
  constructor(private http: HttpClient) { }

  findAll(){
    return this.http.get<Task[]>(this.apiUrl);
  }

  delete(id: number){
    return this.http.delete(`${this.apiUrl}/${id}`)
  }

  persist(task:Task){
    return this.http.post<Task>(this.apiUrl,task);
  }

// This allows us to change the course completion, if is it completed we make uncompleted and the inverse.
completed(id:number, completed:boolean){
  return this.http.patch(`${this.apiUrl}/${id}`,{completed: !completed})
}

update(task:Task):Observable<Task>{
  return this.http.put<Task>(`${this.apiUrl}/${task.id}`, task);
}

}
