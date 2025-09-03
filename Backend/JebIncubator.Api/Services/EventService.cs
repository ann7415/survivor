/*
** EPITECH PROJECT, 2025
** survivor
** File description:
** EventService.cs
*/

using Microsoft.EntityFrameworkCore;
using JebIncubator.Api.Data;
using JebIncubator.Api.Models.DTOs;
using JebIncubator.Api.Models.Entities;

namespace JebIncubator.Api.Services
{
    public class EventService
    {
        private readonly ApplicationDbContext _context;

        public EventService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<EventDto>> GetEventsAsync(string? type = null, DateTime? startDate = null, DateTime? endDate = null)
        {
            var query = _context.Events.AsQueryable();

            if (!string.IsNullOrEmpty(type))
                query = query.Where(e => e.Type.Contains(type));
            if (startDate.HasValue)
                query = query.Where(e => e.Date >= startDate.Value);
            if (endDate.HasValue)
                query = query.Where(e => e.Date <= endDate.Value);
            return await query
                .OrderBy(e => e.Date)
                .Select(e => new EventDto
                {
                    Id = e.Id,
                    Title = e.Title,
                    Description = e.Description,
                    Date = e.Date,
                    Location = e.Location,
                    Type = e.Type
                })
                .ToListAsync();
        }

        public async Task<EventDto?> GetEventByIdAsync(int id)
        {
            var eventItem = await _context.Events.FindAsync(id);

            if (eventItem == null)
                return null;
            return new EventDto
            {
                Id = eventItem.Id,
                Title = eventItem.Title,
                Description = eventItem.Description,
                Date = eventItem.Date,
                Location = eventItem.Location,
                Type = eventItem.Type
            };
        }

        public async Task<List<EventDto>> GetUpcomingEventsAsync(int count = 10)
        {
            return await _context.Events
                .Where(e => e.Date >= DateTime.UtcNow)
                .OrderBy(e => e.Date)
                .Take(count)
                .Select(e => new EventDto
                {
                    Id = e.Id,
                    Title = e.Title,
                    Description = e.Description,
                    Date = e.Date,
                    Location = e.Location,
                    Type = e.Type
                })
                .ToListAsync();
        }

        public async Task<EventDto> CreateEventAsync(EventDto dto)
        {
            var eventItem = new Event
            {
                Title = dto.Title,
                Description = dto.Description,
                Date = dto.Date,
                Location = dto.Location,
                Type = dto.Type
            };

            _context.Events.Add(eventItem);
            await _context.SaveChangesAsync();
            dto.Id = eventItem.Id;
            return dto;
        }

        public async Task<bool> UpdateEventAsync(int id, EventDto dto)
        {
            var eventItem = await _context.Events.FindAsync(id);
            
            if (eventItem == null) 
                return false;
            eventItem.Title = dto.Title;
            eventItem.Description = dto.Description;
            eventItem.Date = dto.Date;
            eventItem.Location = dto.Location;
            eventItem.Type = dto.Type;

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteEventAsync(int id)
        {
            var eventItem = await _context.Events.FindAsync(id);

            if (eventItem == null)
                return false;
            _context.Events.Remove(eventItem);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
