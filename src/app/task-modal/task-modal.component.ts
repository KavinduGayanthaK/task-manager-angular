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
    private taskServiceService: TaskService,
    public dialogRef: MatDialogRef<TaskModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    fb: FormBuilder
  ) {
    this.taskForm = fb.group({
      taskId: [null, Validators.required],
      title: ['', Validators.required],
      description: ['', Validators.required],
      status: ['', Validators.required],
      createdAt: [new Date(), Validators.required],
    });
  }

  onSubmit() {
    if (this.taskForm.valid) {
      this.taskServiceService.createTask(this.taskForm.value).subscribe({
        next: (res) => {
          console.log('Success:', res);
          this.dialogRef.close(this.taskForm.value);
        },
        error: (err) => {
          if (err.status === 201 && err.ok === false) {
            console.log('Received 201 Created, treating as success anyway:', err);
            this.dialogRef.close(this.taskForm.value);
          } else {
            console.error('Actual error:', err);
          }
        }
    });
      this.dialogRef.close(this.taskForm.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
