/*
 ** EPITECH PROJECT, 2025
 ** survivor
 ** File description:
 ** NewsDto.cs
 */

using System.ComponentModel.DataAnnotations;

namespace JebIncubator.Api.Models.DTOs
{
    public class NewsDto
    {
        public int Id { get; set; }
        
        [Required]
        public string Title { get; set; } = string.Empty;
        
        [Required]
        public string Description { get; set; } = string.Empty;
        public DateTime? NewsDate { get; set; }
        public string? Category { get; set; }
        public string? Location { get; set; }
        public int? StartupId { get; set; }
        public bool IsPublished { get; set; }
        public List<string> ImageUrls { get; set; } = new();
    }
}
