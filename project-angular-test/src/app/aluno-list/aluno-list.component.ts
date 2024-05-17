import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlunoService } from '../aluno.service';
import { Aluno } from '../aluno';

@Component({
  selector: 'app-aluno-list',
  templateUrl: './aluno-list.component.html',
  styleUrls: ['./aluno-list.component.css']
})
export class AlunoListComponent implements OnInit {
  alunos: Aluno[] = [];
  searchText: string = '';

  constructor(private alunoService: AlunoService, private router: Router) { }

  ngOnInit(): void {
    this.obterAlunos();
  }

  obterAlunos(): void {
    this.alunoService.getAlunos().subscribe(alunos => {
      this.alunos = alunos;
    });
  }

  pesquisar(): void {
    if (this.searchText.trim() !== '') {
      this.alunoService.pesquisarAlunos(this.searchText).subscribe(alunos => {
        this.alunos = alunos;
      });
    } else {
      this.obterAlunos();
    }
  }

  adicionarAluno(): void {
    this.router.navigateByUrl('/aluno/adicionar');
  }

  editarAluno(aluno: Aluno): void {
    this.router.navigateByUrl(`/aluno/editar/${aluno.iCodAluno}`);
  }

  excluirAluno(aluno: Aluno): void {
    if (confirm(`Tem certeza que deseja excluir o aluno "${aluno.sNome}"?`)) {
      this.alunoService.excluirAluno(aluno.iCodAluno).subscribe(() => {
        this.alunos = this.alunos.filter(a => a !== aluno);
      });
    }
  }
}

