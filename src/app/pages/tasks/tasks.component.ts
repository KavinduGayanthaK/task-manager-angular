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

  constructor(private taskService: TaskService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.taskService.getData().subscribe({
      next: (res: Itask[]) => (this.tasks = res),
      error: (err) => console.error(err),
    });
  }

  openTaskModal() {
    const dialogRef = this.dialog.open(TaskModalComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.tasks.push(result);
      }
    });

    dialogRef.afterClosed().subscribe((result: Itask | undefined) => {
      if (result) this.tasks.push(result);
    });
  }
  filteredTasks() {
    let filtered = this.tasks.filter(task =>
      task.title.toLowerCase().includes(this.searchText.toLowerCase()) ||
      task.description.toLowerCase().includes(this.searchText.toLowerCase())
    );

    // Apply status filter if selected
    if (this.statusFilter) {
      filtered = filtered.filter(task => task.status === this.statusFilter);
    }

    // Sorting based on the selected sort option
    

    return filtered;
  }
}
