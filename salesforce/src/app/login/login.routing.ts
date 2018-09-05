import { Routes, RouterModule }  from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { LoginComponent } from './login.component';
import { CallbackComponent } from './callback/callback.component';

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'callback', component: CallbackComponent },
  // { path: 'callback', component: CallbackComponent }
]

export const LoginRouting: ModuleWithProviders = RouterModule.forChild(routes);
