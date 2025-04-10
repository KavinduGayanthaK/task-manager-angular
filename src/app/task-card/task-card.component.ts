import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-task-card',
  standalone: true, // Ensure it's a standalone component
  imports: [MatCardModule, MatChipsModule, MatProgressBarModule], // Import necessary Material modules directly
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.css']
})
export class TaskCardComponent {
  @Input() task: any;  // Input binding for task data

  // Format the date as needed
  getFormattedDate(date: string): string {
    const taskDate = new Date(date);
    return taskDate.toLocaleDateString(); // Customize this as per your format preference
  }
}
