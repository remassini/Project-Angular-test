import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlunoService } from '../aluno.service';
import { EscolaService } from '../escola.service';
import { Aluno } from '../aluno';
import { Escola } from '../escola';

@Component({
  selector: 'app-aluno-form',
  templateUrl: './aluno-form.component.html',
  styleUrls: ['./aluno-form.component.css']
})
export class AlunoFormComponent implements OnInit {
  aluno: Aluno = { iCodAluno: 0, sNome: '', dNascimento: new Date(), sCPF: '', sEndereco: '', sCelular: '', iCodEscola: 0 };
  escolas: Escola[] = [];

  constructor(
    private alunoService: AlunoService,
    private escolaService: EscolaService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.alunoService.getAlunos().subscribe(alunos => {
        this.aluno = alunos.find(a => a.iCodAluno === +id) || this.aluno;
      });
    }
    this.escolaService.getEscolas().subscribe(escolas => this.escolas = escolas);
  }

  salvarAluno(): void {
    if (this.aluno.iCodAluno) {
      this.alunoService.editarAluno(this.aluno).subscribe(() => {
        this.router.navigateByUrl('/alunos');
      });
    } else {
      this.alunoService.adicionarAluno(this.aluno).subscribe(() => {
        this.router.navigateByUrl('/alunos');
      });
    }
  }
}
