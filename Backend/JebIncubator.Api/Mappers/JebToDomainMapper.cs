/*
** EPITECH PROJECT, 2025
** survivor
** File description:
** JebToDomainMapper.cs
*/

using JebIncubator.Api.Models.Entities;
using JebIncubator.Api.Models;

namespace JebIncubator.Api.Mappers
{
    public static class JebToDomainMapper
    {
        public static Startup ToStartup(this JebApiStartup js)
        {
            return new Startup
            {
                Name = js.Name ?? "No Name",
                Description = js.Description ?? "",
                Sector = js.Sector ?? "Not Specified",
                Location = js.Address ?? "",
                Website = js.WebsiteUrl ?? "",
                ContactEmail = js.Email ?? "",
                ExternalApiId = js.Id,
                Status = js.ProjectStatus ?? "Active",
                CreatedDate = js.CreatedAt != default ? js.CreatedAt : DateTime.UtcNow
            };
        }

        public static News ToNews(this JebApiNews jn)
        {
            return new News
            {
                Title = jn.Title ?? "No Title",
                Content = jn.Content ?? "",
                PublishDate = jn.PublishDate != default ? jn.PublishDate : DateTime.UtcNow,
                Category = jn.Category ?? "",
                ExternalApiId = jn.Id,
                IsPublished = true
            };
        }

        public static Event ToEvent(this JebApiEvent je)
        {
            return new Event
            {
                Title = je.Title ?? "No Title",
                Description = je.Description ?? "",
                Date = je.Date != default ? je.Date : DateTime.UtcNow.AddDays(7),
                Location = je.Location ?? "",
                Type = je.Type ?? "Event",
                ExternalApiId = je.Id
            };
        }

        public static List<Startup> ToStartups(this IEnumerable<JebApiStartup> list)
            => list.Select(js => js.ToStartup()).ToList();

        public static List<News> ToNewsList(this IEnumerable<JebApiNews> list)
            => list.Select(jn => jn.ToNews()).ToList();

        public static List<Event> ToEventsList(this IEnumerable<JebApiEvent> list)
            => list.Select(je => je.ToEvent()).ToList();
    }
}
