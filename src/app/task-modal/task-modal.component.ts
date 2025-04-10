import { Component, Inject } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule,
} from '@angular/material/dialog';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core'; 
import { MatSelectModule } from '@angular/material/select';
import { TaskService } from '../service/taskService/task.service';


@Component({
  selector: 'app-task-modal',
  standalone: true, 
  imports: [
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
  ],
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.css'],
})
export class TaskModalComponent {
  taskForm: FormGroup;

  constructor(
    private taskService: TaskService,
    public dialogRef: MatDialogRef<TaskModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    fb: FormBuilder
  ) {
    this.taskForm = fb.group({
      id: [null, Validators.required],
      title: ['', Validators.required],
      description: ['', Validators.required],
      status: ['', Validators.required],
      createdAt: [new Date(), Validators.required],
    });
    if (data) {
      this.taskForm.patchValue(data); 
    }
  }
 

  onSubmit() {
    if (this.taskForm.valid) {
      if (this.data?.id) {
        this.updateTask();
      } else {
        this.createTask();
      }
    }
  }

  createTask() {
    this.taskService.createTask(this.taskForm.value).subscribe({
      next: (res) => this.dialogRef.close(this.taskForm.value),
      error: (err) => console.error('Error creating task:', err)
    });
  }

  updateTask() {
    this.taskService.updateTask(this.taskForm.value,this.taskForm.value.id).subscribe({
      next: (res) => this.dialogRef.close(this.taskForm.value),
      error: (err) => console.error('Error updating task:', err)
    });
  }
  onCancel(): void {
    this.dialogRef.close();
  }
}
