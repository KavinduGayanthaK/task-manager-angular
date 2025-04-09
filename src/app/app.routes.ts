import { Routes } from '@angular/router';
import { SideNavigationComponent } from './side-navigation/side-navigation.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { TasksComponent } from './pages/tasks/tasks.component';
import { SettingsComponent } from './pages/settings/settings.component';

export const routes: Routes = [
  {
    path: '',
    component: SideNavigationComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'task', component: TasksComponent },
      { path: 'settings', component: SettingsComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: '' }
];