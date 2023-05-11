import { NxWelcomeComponent } from './nx-welcome.component';
import { Route } from '@angular/router';
import { loadRemoteModule } from '@nx/angular/mf';

export const appRoutes: Route[] = [
  {
    path: 'custom-theme',
    loadChildren: () =>
      loadRemoteModule('custom-theme', './Module').then(
        (m) => m.RemoteEntryModule
      ),
  },
  {
    path: '',
    component: NxWelcomeComponent,
  },
];
