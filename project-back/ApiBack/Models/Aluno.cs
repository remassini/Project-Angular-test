using System.ComponentModel.DataAnnotations;
using System.Globalization;

namespace ApiBack.Models
{
    public class Aluno
    {
        public int iCodAluno { get; set; }
        public string sNome { get; set; } = string.Empty;
        public DateTime dNascimento { get; set; }
        public string sCPF { get; set; } = string.Empty;
        public string sEndereco { get; set; } = string.Empty;
        public string sCelular { get; set; } = string.Empty;
        public int iCodEscola { get; set; }
    }
}
