using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SofttekChallenger.Models;
using System.Text.Json;

namespace SofttekChallenger.Controllers
{
    [ApiController]
    [Route("api/[controller]")]

    public class PatientsController : ControllerBase
    {
        private static List<Patient> _Patitents = new()
    {
        new Patient { Id = 1, Nome = "Maria Silva", DataNascimento = new DateTime(1990, 5, 10) },
        new Patient { Id = 2, Nome = "João Souza", DataNascimento = new DateTime(1985, 3, 20) }
    };

        private static int _nextId = 3;

        [Authorize]
        [HttpGet]
        public IActionResult Get([FromQuery] string? nome)
        {
            var query = _Patitents.AsQueryable();
            if (!string.IsNullOrWhiteSpace(nome))
            {
                query = query.Where(p => p.Nome.Contains(nome, StringComparison.OrdinalIgnoreCase));
            }
            return Ok(query.ToList());
        }

        [HttpPost]
        public IActionResult Post([FromBody] Patient novoPatitent)
        {
            if (string.IsNullOrWhiteSpace(novoPatitent.Nome))
                return BadRequest("Nome é obrigatório");

            novoPatitent.Id = _nextId++;
            _Patitents.Add(novoPatitent);
            return CreatedAtAction(nameof(Get), new { id = novoPatitent.Id }, novoPatitent);
        }

        [HttpGet("/api/legacy/Patients")]
        public IActionResult GetLegacy()
        {
            var filePath = Path.Combine(Directory.GetCurrentDirectory(), "legacy-patients.json");
            if (!System.IO.File.Exists(filePath))
                return NotFound("Arquivo legacy-Patitents.json não encontrado.");

            var json = System.IO.File.ReadAllText(filePath);
            var options = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };
            var legacyPatitents = JsonSerializer.Deserialize<List<LegacyPatient>>(json, options);

            if (legacyPatitents == null) return Ok(new List<Patient>());

            var PatitentsConvertidos = legacyPatitents.Select(lp => new Patient
            {
                Id = lp.Codigo,
                Nome = lp.NomeCompleto,
                DataNascimento = lp.DtNasc
            }).ToList();

            return Ok(PatitentsConvertidos);
        }
    }
}
