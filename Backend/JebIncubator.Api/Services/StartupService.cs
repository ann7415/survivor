using Microsoft.EntityFrameworkCore;
using JebIncubator.Api.Data;
using JebIncubator.Api.Models.DTOs;
using JebIncubator.Api.Models.Entities;

namespace JebIncubator.Api.Services
{
    public class StartupService
    {
        private readonly ApplicationDbContext _context;

        public StartupService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<StartupDto>> GetStartupsAsync(string? search = null)
        {
            var query = _context.Startups.AsQueryable();

            if (!string.IsNullOrEmpty(search))
                query = query.Where(s => s.Name.Contains(search) || s.Sector.Contains(search));

            return await query
                .Select(s => new StartupDto
                {
                    Id = s.Id,
                    Name = s.Name,
                    Description = s.Description,
                    Sector = s.Sector,
                    Location = s.Location,
                    Website = s.Website,
                    ContactEmail = s.ContactEmail,
                    Status = s.Status,
                    CreatedDate = s.CreatedDate
                })
                .ToListAsync();
        }

        public async Task<StartupDto?> GetStartupByIdAsync(int id)
        {
            var s = await _context.Startups.FindAsync(id);
            if (s == null) return null;

            return new StartupDto
            {
                Id = s.Id,
                Name = s.Name,
                Description = s.Description,
                Sector = s.Sector,
                Location = s.Location,
                Website = s.Website,
                ContactEmail = s.ContactEmail,
                Status = s.Status,
                CreatedDate = s.CreatedDate
            };
        }

        public async Task<StartupDto> CreateStartupAsync(StartupDto dto)
        {
            var startup = new Startup
            {
                Name = dto.Name,
                Description = dto.Description,
                Sector = dto.Sector,
                Location = dto.Location,
                Website = dto.Website,
                ContactEmail = dto.ContactEmail,
                Status = "Active"
            };

            _context.Startups.Add(startup);
            await _context.SaveChangesAsync();

            dto.Id = startup.Id;
            dto.CreatedDate = startup.CreatedDate;
            return dto;
        }

        public async Task<bool> UpdateStartupAsync(int id, StartupDto dto)
        {
            var s = await _context.Startups.FindAsync(id);
            if (s == null) return false;

            s.Name = dto.Name;
            s.Description = dto.Description;
            s.Sector = dto.Sector;
            s.Location = dto.Location;
            s.Website = dto.Website;
            s.ContactEmail = dto.ContactEmail;
            s.UpdatedDate = DateTime.UtcNow;

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteStartupAsync(int id)
        {
            var s = await _context.Startups.FindAsync(id);
            if (s == null) return false;

            _context.Startups.Remove(s);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
