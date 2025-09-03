/*
** EPITECH PROJECT, 2025
** survivor
** File description:
** Event.cs
*/

using System.ComponentModel.DataAnnotations;

namespace JebIncubator.Api.Models.Entities
{
    public class Event
    {
        public int Id { get; set; }
        
        [Required]
        public string Title { get; set; } = string.Empty;
        
        public string Description { get; set; } = string.Empty;
        public DateTime Date { get; set; }
        public string Location { get; set; } = string.Empty;
        public string Type { get; set; } = string.Empty;
        public int? ExternalApiId { get; set; }
    }
}
