import { NgModule } from '@angular/core';
import { CommonModule }  from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { LoginRouting } from './login.routing';
import { LoginComponent } from './login.component';
import { CallbackComponent } from './callback';

@NgModule({
  declarations: [
    LoginComponent,
    CallbackComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LoginRouting
  ]
})

export class LoginModule { }
