import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Aluno } from './aluno';

@Injectable({
  providedIn: 'root'
})
export class AlunoService {
  private alunos: Aluno[] = [
    { iCodAluno: 1, sNome: 'João Silva', dNascimento: new Date('2000-01-01'), sCPF: '123.456.789-00', sEndereco: 'Rua A, 123', sCelular: '1111-1111', iCodEscola: 1 },
    // adicione mais alunos mockados se necessário
  ];

  constructor() { }

  getAlunos(): Observable<Aluno[]> {
    return of(this.alunos);
  }

  pesquisarAlunos(term: string): Observable<Aluno[]> {
    if (!term.trim()) {
      return of(this.alunos);
    }
    const searchTerm = term.toLowerCase();
    const filteredAlunos = this.alunos.filter(aluno =>
      aluno.sNome.toLowerCase().includes(searchTerm) || aluno.sCPF.includes(searchTerm)
    );
    return of(filteredAlunos);
  }

  adicionarAluno(aluno: Aluno): Observable<Aluno> {
    aluno.iCodAluno = this.alunos.length > 0 ? Math.max(...this.alunos.map(a => a.iCodAluno)) + 1 : 1;
    this.alunos.push(aluno);
    return of(aluno);
  }

  editarAluno(aluno: Aluno): Observable<any> {
    const index = this.alunos.findIndex(a => a.iCodAluno === aluno.iCodAluno);
    if (index !== -1) {
      this.alunos[index] = aluno;
    }
    return of(aluno);
  }

  excluirAluno(id: number): Observable<Aluno> {
    this.alunos = this.alunos.filter(a => a.iCodAluno !== id);
    return null as any;
  }
}
