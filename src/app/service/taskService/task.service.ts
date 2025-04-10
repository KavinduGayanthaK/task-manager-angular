import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Itask } from '../../model/task/itask';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  base_url: string = 'http://localhost:5555/api/v1/task';

  constructor(private http: HttpClient) {}

  getData(): Observable<Itask[]> {
    return this.http.get<Itask[]>(this.base_url);
  }

  createTask(task: Itask): Observable<any> {
    return this.http.post(this.base_url, task, {
      responseType: 'text'
    });
  }

  updateTask(task: Itask,id:number): Observable<any> {
    console.log(id)
    const url = `${this.base_url}/${id}`;
    return this.http.patch(url, task, {
      responseType: 'text'
    });
  }

  deleteTask(id: number): Observable<any> {
    const url = `${this.base_url}/${id}`; 
    console.log(url)
    return this.http.delete(url, {
      responseType: 'text'
    });
  }
}
