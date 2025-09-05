using Xunit;
using SofttekChallenger.Models;
using System;

namespace SofttekChallenger.Tests
{
    public class PatientTests
    {
        [Fact]
        public void Patient_CanBeCreated_WithValidProperties()
        {
            // Arrange
            var patient = new Patient
            {
                Id = 1,
                Nome = "Teste",
                DataNascimento = new DateTime(2000, 1, 1)
            };

            // Assert
            Assert.Equal(1, patient.Id);
            Assert.Equal("Teste", patient.Nome);
            Assert.Equal(new DateTime(2000, 1, 1), patient.DataNascimento);
        }
    }
}
