import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { QueryComponent } from './query/query.component';
import { HomeComponent } from './home';
import { SetupComponent} from './setup';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
//   { path: '**', redirectTo: 'pages/dashboard' },
    { path: 'login', loadChildren: './login/login.module#LoginModule' },
    { path: 'query', component: QueryComponent },
    { path: 'home', component: HomeComponent },
    { path: 'setup', component: SetupComponent }
];

export const AppRouting: ModuleWithProviders = RouterModule.forRoot(routes, { useHash: true });
