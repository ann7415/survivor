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
        public string Content { get; set; } = string.Empty;
        
        public DateTime PublishDate { get; set; } = DateTime.UtcNow;
        
        public string Category { get; set; } = string.Empty;
        
        public bool IsPublished { get; set; } = true;
    }
}
