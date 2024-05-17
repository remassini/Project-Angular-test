import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EscolaService } from '../escola.service';
import { Escola } from '../escola';

@Component({
  selector: 'app-escola-form',
  templateUrl: './escola-form.component.html',
  styleUrls: ['./escola-form.component.css']
})
export class EscolaFormComponent implements OnInit {
  escola: Escola = { iCodEscola: 0, sDescricao: '' };

  constructor(
    private escolaService: EscolaService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.escolaService.getEscolas().subscribe(escolas => {
        this.escola = escolas.find(e => e.iCodEscola === +id) || this.escola;
      });
    }
  }

  salvarEscola(): void {
    if (this.escola.iCodEscola) {
      this.escolaService.editarEscola(this.escola).subscribe(() => {
        this.router.navigateByUrl('/escolas');
      });
    } else {
      this.escolaService.adicionarEscola(this.escola).subscribe(() => {
        this.router.navigateByUrl('/escolas');
      });
    }
  }
}
