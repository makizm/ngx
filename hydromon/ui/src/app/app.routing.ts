import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

export const AppRoutes: Routes = [
//   { path: '', redirectTo: 'pages', pathMatch: 'full' },
//   { path: '**', redirectTo: 'pages/dashboard' }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(AppRoutes, { useHash: true });
