/*
** EPITECH PROJECT, 2025
** survivor
** File description:
** RegisterDto.cs
*/

using System.ComponentModel.DataAnnotations;

namespace JebIncubator.Api.Models.DTOs
{
    public class RegisterDto
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;
        
        [Required]
        [MinLength(6)]
        public string Password { get; set; } = string.Empty;
        
        [Required]
        public string Role { get; set; } = "Visitor";
    }
}
