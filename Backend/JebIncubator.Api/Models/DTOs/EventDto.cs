using System.ComponentModel.DataAnnotations;

namespace JebIncubator.Api.Models.DTOs
{
    public class EventDto
    {
        public int Id { get; set; }
        
        [Required]
        public string Title { get; set; } = string.Empty;
        
        public string Description { get; set; } = string.Empty;
        
        [Required]
        public DateTime Date { get; set; }
        
        public string Location { get; set; } = string.Empty;
        
        public string Type { get; set; } = string.Empty;
    }
}