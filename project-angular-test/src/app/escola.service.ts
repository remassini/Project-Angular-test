import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Escola } from './escola';

@Injectable({
  providedIn: 'root'
})
export class EscolaService {
  private escolasUrl = 'api/escolas'; // URL to web api

  constructor(private http: HttpClient) { }

  getEscolas(): Observable<Escola[]> {
    return this.http.get<Escola[]>(this.escolasUrl);
  }

  pesquisarEscolas(term: string): Observable<Escola[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this.http.get<Escola[]>(`${this.escolasUrl}/?sDescricao=${term}`);
  }

  adicionarEscola(escola: Escola): Observable<Escola> {
    return this.http.post<Escola>(this.escolasUrl, escola);
  }

  editarEscola(escola: Escola): Observable<any> {
    return this.http.put(this.escolasUrl, escola);
  }

  excluirEscola(id: number): Observable<Escola> {
    const url = `${this.escolasUrl}/${id}`;
    return this.http.delete<Escola>(url);
  }
}
