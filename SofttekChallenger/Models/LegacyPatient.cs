namespace SofttekChallenger.Models
{
    public class LegacyPatient
    {
        public int Codigo { get; set; }
        public string NomeCompleto { get; set; } = string.Empty;
        public DateTime? DtNasc { get; set; }
    }
}
