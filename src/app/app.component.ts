import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideNavigationComponent } from "./side-navigation/side-navigation.component";

@Component({
  selector: 'app-root',
  imports: [SideNavigationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'task-manager-angular';
}
