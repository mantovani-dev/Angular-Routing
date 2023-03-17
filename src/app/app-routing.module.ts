import { ListComponent } from './list/list.component';
import { RegisterComponent } from './register/register.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: 'register', component: RegisterComponent },
  {path: 'edit/:index', component: RegisterComponent }, // Usando o mesmo componente Register, envia um index como parâmetro
  {path: 'list', component: ListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
