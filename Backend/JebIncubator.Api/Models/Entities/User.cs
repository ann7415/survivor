using System.ComponentModel.DataAnnotations;

namespace JebIncubator.Api.Models.Entities
{
    public class User
    {
        public int Id { get; set; }
        
        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;
        
        [Required]
        public string PasswordHash { get; set; } = string.Empty;
        
        [Required]
        public string Role { get; set; } = "Visitor";
        
        public int? StartupId { get; set; }
        public Startup? Startup { get; set; }
        
        public DateTime CreatedDate { get; set; } = DateTime.UtcNow;
    }
}