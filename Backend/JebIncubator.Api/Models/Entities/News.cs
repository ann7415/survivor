/*
** EPITECH PROJECT, 2025
** survivor
** File description:
** News.cs
*/

using System.ComponentModel.DataAnnotations;

namespace JebIncubator.Api.Models.Entities
{
    public class News
    {
        public int Id { get; set; }
        
        [Required]
        public string Title { get; set; } = string.Empty;
        
        public string Content { get; set; } = string.Empty;
        public DateTime PublishDate { get; set; } = DateTime.UtcNow;
        public string Category { get; set; } = string.Empty;
        public bool IsPublished { get; set; } = true;
        
        public int? ExternalApiId { get; set; }
    }
}
