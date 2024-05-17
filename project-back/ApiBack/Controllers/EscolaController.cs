using ApiBack.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ApiBack.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EscolasController : ControllerBase
    {
        private static List<Escola>
            escolas = new List<Escola>
                {
        new Escola { iCodEscola = 1, sDescricao = "Escola A" },
                // Adicione mais escolas se necessário
                };

        [HttpGet]
        public ActionResult<IEnumerable<Escola>
            > GetEscolas()
        {
            return Ok(escolas);
        }

        [HttpGet("search")]
        public ActionResult<IEnumerable<Escola>
            > SearchEscolas(string term)
        {
            var filteredEscolas = escolas.Where(e => e.sDescricao.Contains(term, StringComparison.OrdinalIgnoreCase)).ToList();
            return Ok(filteredEscolas);
        }

        [HttpPost]
        public ActionResult<Escola> PostEscola([FromBody] Escola escola)
        {
            escola.iCodEscola = escolas.Any() ? escolas.Max(e => e.iCodEscola) + 1 : 1;
            escolas.Add(escola);
            return CreatedAtAction(nameof(GetEscolas), new { id = escola.iCodEscola }, escola);
        }

        [HttpPut("{id}")]
        public IActionResult PutEscola(int id, [FromBody] Escola escola)
        {
            var existingEscola = escolas.FirstOrDefault(e => e.iCodEscola == id);
            if (existingEscola == null)
            {
                return NotFound();
            }
            existingEscola.sDescricao = escola.sDescricao;
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteEscola(int id)
        {
            var escola = escolas.FirstOrDefault(e => e.iCodEscola == id);
            if (escola == null)
            {
                return NotFound();
            }
            escolas.Remove(escola);
            return NoContent();
        }
    }
}