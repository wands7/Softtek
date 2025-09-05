using Xunit;
using SofttekChallenger.Controllers;
using SofttekChallenger.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;

namespace SofttekChallenger.Tests
{
    public class PatientsControllerTests
    {
        [Fact]
        public void Get_ReturnsAllPatients_WhenNomeIsNull()
        {
            // Arrange
            var controller = new PatientsController();

            // Act
            var result = controller.Get(null) as OkObjectResult;
            var patients = result?.Value as List<Patient>;

            // Assert
            Assert.NotNull(result);
            Assert.NotNull(patients);
            Assert.True(patients.Count >= 2); // Should have at least the seeded patients
        }

        [Fact]
        public void Get_ReturnsFilteredPatients_WhenNomeIsProvided()
        {
            // Arrange
            var controller = new PatientsController();

            // Act
            var result = controller.Get("Maria") as OkObjectResult;
            var patients = result?.Value as List<Patient>;

            // Assert
            Assert.NotNull(result);
            Assert.NotNull(patients);
            Assert.Single(patients);
            Assert.Equal("Maria Silva", patients[0].Nome);
        }

        [Fact]
        public void Post_ReturnsBadRequest_WhenNomeIsEmpty()
        {
            // Arrange
            var controller = new PatientsController();
            var patient = new Patient { Nome = "", DataNascimento = DateTime.Now };

            // Act
            var result = controller.Post(patient);

            // Assert
            Assert.IsType<BadRequestObjectResult>(result);
        }

        [Fact]
        public void Post_ReturnsCreatedAtAction_WhenValidPatient()
        {
            // Arrange
            var controller = new PatientsController();
            var patient = new Patient { Nome = "Teste", DataNascimento = DateTime.Now };

            // Act
            var result = controller.Post(patient);

            // Assert
            Assert.IsType<CreatedAtActionResult>(result);
        }
    }
}
