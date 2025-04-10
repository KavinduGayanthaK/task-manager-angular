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

  getData() {
    return this.http.get<Itask[]>(this.base_url);
  }

  createTask(task: Itask): Observable<any> {
    return this.http.post(this.base_url, task, {
      responseType: 'text' 
    });
  }
}
