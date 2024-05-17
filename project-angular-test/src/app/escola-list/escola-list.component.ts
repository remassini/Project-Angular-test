import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EscolaService } from '../escola.service';
import { Escola } from '../escola';

@Component({
  selector: 'app-escola-list',
  templateUrl: './escola-list.component.html',
  styleUrls: ['./escola-list.component.css']
})
export class EscolaListComponent implements OnInit {
  escolas: Escola[] = [];
  searchText: string = '';

  constructor(private escolaService: EscolaService, private router: Router) { }

  ngOnInit(): void {
    this.obterEscolas();
  }

  obterEscolas(): void {
    this.escolaService.getEscolas().subscribe(escolas => {
      this.escolas = escolas;
    });
  }

  pesquisar(): void {
    if (this.searchText.trim() !== '') {
      this.escolaService.pesquisarEscolas(this.searchText).subscribe(escolas => {
        this.escolas = escolas;
      });
    } else {
      this.obterEscolas();
    }
  }

  adicionarEscola(): void {
    this.router.navigateByUrl('/escola/adicionar');
  }

  editarEscola(escola: Escola): void {
    this.router.navigateByUrl(`/escola/editar/${escola.iCodEscola}`);
  }

  excluirEscola(escola: Escola): void {
    if (confirm(`Tem certeza que deseja excluir a escola "${escola.sDescricao}"?`)) {
      this.escolaService.excluirEscola(escola.iCodEscola).subscribe(() => {
        this.escolas = this.escolas.filter(e => e !== escola);
      });
    }
  }
}
