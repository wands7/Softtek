using SofttekChallenger.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.IO;
using System.Text.Json;

namespace SofttekChallenger.Services
{
    public interface IPacienteService
    {
        List<Patient> GetAll(string? nome);
        Patient Add(Patient paciente);
        List<Patient> GetFromLegacy(string filePath);
    }

    public class PacienteService : IPacienteService
    {
        private static List<Patient> _pacientes = new()
        {
            new Patient { Id = 1, Nome = "Maria Silva", DataNascimento = new DateTime(1990, 5, 10) },
            new Patient { Id = 2, Nome = "João Souza", DataNascimento = new DateTime(1985, 3, 20) }
        };
        private static int _nextId = 3;

        public List<Patient> GetAll(string? nome)
        {
            var query = _pacientes.AsQueryable();
            if (!string.IsNullOrWhiteSpace(nome))
            {
                query = query.Where(p => p.Nome.Contains(nome, StringComparison.OrdinalIgnoreCase));
            }
            return query.ToList();
        }

        public Patient Add(Patient paciente)
        {
            paciente.Id = _nextId++;
            _pacientes.Add(paciente);
            return paciente;
        }

        public List<Patient> GetFromLegacy(string filePath)
        {
            if (!File.Exists(filePath)) return new List<Patient>();
            var json = File.ReadAllText(filePath);
            var options = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };
            var legacyPacientes = JsonSerializer.Deserialize<List<LegacyPatient>>(json, options);
            if (legacyPacientes == null) return new List<Patient>();
            return legacyPacientes.Select(lp => new Patient
            {
                Id = lp.Codigo,
                Nome = lp.NomeCompleto,
                DataNascimento = lp.DtNasc
            }).ToList();
        }
    }
}
