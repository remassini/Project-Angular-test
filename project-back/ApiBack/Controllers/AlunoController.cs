using ApiBack.Models;
using Microsoft.AspNetCore.Mvc;
using AlunoControllers;
using System.Collections.Generic;
using System.Linq;

namespace AlunoControllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AlunosController : ControllerBase
    {
        private static List<Aluno> alunos = new List<Aluno>
        {
            new Aluno { iCodAluno = 1, sNome = "João Silva", dNascimento = new DateTime(2000, 1, 1), sCPF = "123.456.789-00", sEndereco = "Rua A, 123", sCelular = "1111-1111", iCodEscola = 1 },
            // Adicione mais alunos se necessário
        };

        [HttpGet]
        public ActionResult<IEnumerable<Aluno>> GetAlunos()
        {
            return Ok(alunos);
        }

        [HttpGet("search")]
        public ActionResult<IEnumerable<Aluno>> SearchAlunos(string term)
        {
            var filteredAlunos = alunos.Where(a => a.sNome.Contains(term, StringComparison.OrdinalIgnoreCase) || a.sCPF.Contains(term)).ToList();
            return Ok(filteredAlunos);
        }

        [HttpPost]
        public ActionResult<Aluno> PostAluno([FromBody] Aluno aluno)
        {
            aluno.iCodAluno = alunos.Any() ? alunos.Max(a => a.iCodAluno) + 1 : 1;
            alunos.Add(aluno);
            return CreatedAtAction(nameof(GetAlunos), new { id = aluno.iCodAluno }, aluno);
        }

        [HttpPut("{id}")]
        public IActionResult PutAluno(int id, [FromBody] Aluno aluno)
        {
            var existingAluno = alunos.FirstOrDefault(a => a.iCodAluno == id);
            if (existingAluno == null)
            {
                return NotFound();
            }
            existingAluno.sNome = aluno.sNome;
            existingAluno.dNascimento = aluno.dNascimento;
            existingAluno.sCPF = aluno.sCPF;
            existingAluno.sEndereco = aluno.sEndereco;
            existingAluno.sCelular = aluno.sCelular;
            existingAluno.iCodEscola = aluno.iCodEscola;
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteAluno(int id)
        {
            var aluno = alunos.FirstOrDefault(a => a.iCodAluno == id);
            if (aluno == null)
            {
                return NotFound();
            }
            alunos.Remove(aluno);
            return NoContent();
        }
    }
}

