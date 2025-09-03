/*
** EPITECH PROJECT, 2025
** survivor
** File description:
** Startup.cs
*/

using System.ComponentModel.DataAnnotations;

namespace JebIncubator.Api.Models.Entities
{
    public class Startup
    {
        public int Id { get; set; }
        
        [Required]
        public string Name { get; set; } = string.Empty;
        
        public string Description { get; set; } = string.Empty;
        public string Sector { get; set; } = string.Empty;
        public string Location { get; set; } = string.Empty;
        public string Website { get; set; } = string.Empty;
        public string ContactEmail { get; set; } = string.Empty;
        public string Status { get; set; } = "Active";
        
        public DateTime CreatedDate { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedDate { get; set; } = DateTime.UtcNow;
        
        public int? ExternalApiId { get; set; }
        
        public List<User> Users { get; set; } = new();
    }
}
