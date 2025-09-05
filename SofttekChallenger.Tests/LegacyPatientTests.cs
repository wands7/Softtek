using Xunit;
using SofttekChallenger.Models;
using System;

namespace SofttekChallenger.Tests
{
    public class LegacyPatientTests
    {
        [Fact]
        public void LegacyPatient_CanBeCreated_WithValidProperties()
        {
            // Arrange
            var legacyPatient = new LegacyPatient
            {
                Codigo = 10,
                NomeCompleto = "Legacy Test",
                DtNasc = new DateTime(1995, 5, 5)
            };

            // Assert
            Assert.Equal(10, legacyPatient.Codigo);
            Assert.Equal("Legacy Test", legacyPatient.NomeCompleto);
            Assert.Equal(new DateTime(1995, 5, 5), legacyPatient.DtNasc);
        }
    }
}
