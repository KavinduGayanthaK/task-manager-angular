import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // ✅ Add this
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TaskModalComponent } from '../../task-modal/task-modal.component';

import { Itask } from '../../model/task/itask';
import { TaskCardComponent } from '../../task-card/task-card.component';
import { TaskService } from '../../service/taskService/task.service';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    TaskCardComponent,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  tasks: Itask[] = [];

  searchText: string = '';
  sortBy: string = 'newest';
  statusFilter: string = '';

  constructor(private taskService: TaskService, private dialog: MatDialog) {
    this.loadTasks();
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

 

  loadTasks() {
    this.taskService.getData().subscribe({
      next: (res: Itask[]) => (this.tasks = res),
      error: (err) => console.error('Error fetching tasks', err),
    });
  }

  openTaskModal(task?: any): void {
    const dialogRef = this.dialog.open(TaskModalComponent, {
      width: '500px',
      data: task || null
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadTasks();
      }
    });
  }
  

  filteredTasksByStatus(status: string): Itask[] {
    return this.tasks.filter(task =>
      (task.status?.toLowerCase() === status.toLowerCase()) &&
      (task.title.toLowerCase().includes(this.searchText.toLowerCase()) ||
       task.description.toLowerCase().includes(this.searchText.toLowerCase()))
    );
  }
  
  onTaskUpdated(task: any) {
    this.openTaskModal(task); 
  }

  onTaskDeleted(task: any) {
    this.taskService.deleteTask(task.id).subscribe(() => {
      this.loadTasks();
    });
  }

}
