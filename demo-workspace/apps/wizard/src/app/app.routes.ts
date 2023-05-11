import { NxWelcomeComponent } from './nx-welcome.component';
import { Route } from '@angular/router';
import { loadRemoteModule } from '@nx/angular/mf';

export const appRoutes: Route[] = [
  {
    path: 'search',
    loadChildren: () =>
      loadRemoteModule('search', './Module').then((m) => m.RemoteEntryModule),
  },
  {
    path: 'categories',
    loadChildren: () =>
      loadRemoteModule('categories', './Module').then(
        (m) => m.RemoteEntryModule
      ),
  },
  {
    path: 'projects',
    loadChildren: () =>
      loadRemoteModule('projects', './Module').then((m) => m.RemoteEntryModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      loadRemoteModule('login', './Module').then((m) => m.RemoteEntryModule),
  },
  {
    path: '',
    component: NxWelcomeComponent,
  },
];
