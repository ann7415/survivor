using System;

namespace JebIncubator.Api.Models
{
    public class JebApiStartup
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? LegalStatus { get; set; }
        public string? Address { get; set; }
        public string? Email { get; set; }
        public string? Phone { get; set; }
        public string? Sector { get; set; }
        public string? Maturity { get; set; }
        public string? Description { get; set; }
        public string? WebsiteUrl { get; set; }
        public string? ProjectStatus { get; set; }
        public DateTime CreatedAt { get; set; }
    }

    public class JebApiNews
    {
        public int Id { get; set; }
        public string? Title { get; set; }
        public string? Content { get; set; }
        public DateTime PublishDate { get; set; }
        public string? Category { get; set; }
    }

    public class JebApiEvent
    {
        public int Id { get; set; }
        public string? Title { get; set; }
        public string? Description { get; set; }
        public DateTime Date { get; set; }
        public string? Location { get; set; }
        public string? Type { get; set; }
    }
}