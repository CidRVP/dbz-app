import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'character/:id',
    loadComponent: () => import('./character-details/character-details.page').then((m) => m.CharacterDetailsPage),
  },
  {
    path: '**',
    redirectTo: ''
  }
];