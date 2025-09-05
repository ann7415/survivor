/*
 ** EPITECH PROJECT, 2025
 ** survivor
 ** File description:
 ** NewsImage.cs
 */

using System.ComponentModel.DataAnnotations;

namespace JebIncubator.Api.Models.Entities
{
    public class NewsImage
    {
        public int Id { get; set; }
        public string Url { get; set; } = string.Empty;

        public int NewsId { get; set; }
        public News News { get; set; } = null!;
    }
}
