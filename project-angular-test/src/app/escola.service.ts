import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Escola } from './escola';

@Injectable({
  providedIn: 'root'
})
export class EscolaService {
  private escolas: Escola[] = [
    { iCodEscola: 1, sDescricao: 'Escola A' },
    { iCodEscola: 2, sDescricao: 'Escola B' },
    { iCodEscola: 3, sDescricao: 'Escola C' },
    // adicione mais escolas mockadas se necessário
  ];

  constructor() { }

  getEscolas(): Observable<Escola[]> {
    return of(this.escolas);
  }

  pesquisarEscolas(term: string): Observable<Escola[]> {
    if (!term.trim()) {
      return of(this.escolas);
    }
    const searchTerm = term.toLowerCase();
    const filteredEscolas = this.escolas.filter(escola =>
      escola.sDescricao.toLowerCase().includes(searchTerm)
    );
    return of(filteredEscolas);
  }

  adicionarEscola(escola: Escola): Observable<Escola> {
    escola.iCodEscola = this.escolas.length > 0 ? Math.max(...this.escolas.map(e => e.iCodEscola)) + 1 : 1;
    this.escolas.push(escola);
    return of(escola);
  }

  editarEscola(escola: Escola): Observable<any> {
    const index = this.escolas.findIndex(e => e.iCodEscola === escola.iCodEscola);
    if (index !== -1) {
      this.escolas[index] = escola;
    }
    return of(escola);
  }

  excluirEscola(id: number): Observable<Escola> {
    this.escolas = this.escolas.filter(e => e.iCodEscola !== id);
    return null as any;
  }
}
