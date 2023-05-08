import { NxWelcomeComponent } from './nx-welcome.component';
import { Route } from '@angular/router';
import { loadRemoteModule } from '@nx/angular/mf';

export const appRoutes: Route[] = [
  {
    path: 'checkout',
    loadChildren: () =>
    loadRemoteModule('checkout', './Module').then(
      (m) => m.RemoteEntryModule
   ),
  },
  {
    path: 'product',
    loadChildren: () =>
    loadRemoteModule('product', './Module').then(
      (m) => m.RemoteEntryModule
   ),
  },
  {
    path: 'login',
    loadChildren: () =>
    loadRemoteModule('login', './Module').then(
        (m) => m.RemoteEntryModule
     ),
  },
  {
    path: '',
    component: NxWelcomeComponent,
  },
];
