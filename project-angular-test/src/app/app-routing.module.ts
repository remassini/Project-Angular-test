import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AlunoListComponent } from './aluno-list/aluno-list.component';
import { EscolaListComponent } from './escola-list/escola-list.component';
import { AlunoFormComponent } from './aluno-form/aluno-form.component';
import { EscolaFormComponent } from './escola-form/escola-form.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'alunos', component: AlunoListComponent },
  { path: 'aluno/adicionar', component: AlunoFormComponent },
  { path: 'aluno/editar/:id', component: AlunoFormComponent },
  { path: 'escolas', component: EscolaListComponent },
  { path: 'escola/adicionar', component: EscolaFormComponent },
  { path: 'escola/editar/:id', component: EscolaFormComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }