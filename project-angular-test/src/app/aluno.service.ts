import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Aluno } from './aluno';

@Injectable({
  providedIn: 'root'
})
export class AlunoService {
  private alunosUrl = 'api/alunos'; // URL to web api

  constructor(private http: HttpClient) { }

  getAlunos(): Observable<Aluno[]> {
    return this.http.get<Aluno[]>(this.alunosUrl);
  }

  pesquisarAlunos(term: string): Observable<Aluno[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Aluno[]>(`${this.alunosUrl}/?sNome=${term}`);
  }

  adicionarAluno(aluno: Aluno): Observable<Aluno> {
    return this.http.post<Aluno>(this.alunosUrl, aluno);
  }

  editarAluno(aluno: Aluno): Observable<any> {
    return this.http.put(this.alunosUrl, aluno);
  }

  excluirAluno(id: number): Observable<Aluno> {
    const url = `${this.alunosUrl}/${id}`;
    return this.http.delete<Aluno>(url);
  }
}
