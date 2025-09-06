/*
** EPITECH PROJECT, 2025
** survivor
** File description:
** UserService.cs
*/

using Microsoft.EntityFrameworkCore;
using JebIncubator.Api.Data;
using JebIncubator.Api.Models.DTOs;
using JebIncubator.Api.Models.Entities;

namespace JebIncubator.Api.Services
{
    public class UserService
    {
        private readonly ApplicationDbContext _context;

        public UserService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<UserDto>> GetUsersAsync(string? role = null, string? search = null)
        {
            var query = _context.Users.Include(u => u.Startup).AsQueryable();

            if (!string.IsNullOrEmpty(role))
                query = query.Where(u => u.Role == role);
            if (!string.IsNullOrEmpty(search))
                query = query.Where(u => u.Email.Contains(search));
            return await query
                .Select(u => new UserDto
                {
                    Id = u.Id,
                    Email = u.Email,
                    Role = u.Role,
                    StartupId = u.StartupId,
                    StartupName = u.Startup != null ? u.Startup.Name : null,
                    CreatedDate = u.CreatedDate,
                    LastLoginDate = u.LastLoginDate
                })
                .ToListAsync();
        }

        public async Task<UserDto?> GetUserByIdAsync(int id)
        {
            var user = await _context.Users
                .Include(u => u.Startup)
                .FirstOrDefaultAsync(u => u.Id == id);

            if (user == null)
                return null;
            return new UserDto
            {
                Id = user.Id,
                Email = user.Email,
                Role = user.Role,
                StartupId = user.StartupId,
                StartupName = user.Startup?.Name,
                CreatedDate = user.CreatedDate,
                LastLoginDate = user.LastLoginDate
            };
        }

        public async Task<UserDto?> GetUserByEmailAsync(string email)
        {
            var user = await _context.Users
                .Include(u => u.Startup)
                .FirstOrDefaultAsync(u => u.Email == email);

            if (user == null)
                return null;
            return new UserDto
            {
                Id = user.Id,
                Email = user.Email,
                Role = user.Role,
                StartupId = user.StartupId,
                StartupName = user.Startup?.Name,
                CreatedDate = user.CreatedDate,
                LastLoginDate = user.LastLoginDate
            };
        }

        public async Task<bool> UpdateUserAsync(int id, UserUpdateDto dto)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
                return false;
            user.Email = dto.Email;
            user.Role = dto.Role;
            user.StartupId = dto.StartupId;
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteUserAsync(int id)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
                return false;
            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> UpdateUserRoleAsync(int id, string role)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
                return false;
            user.Role = role;
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> AssignUserToStartupAsync(int userId, int? startupId)
        {
            var user = await _context.Users.FindAsync(userId);

            if (user == null)
                return false;
            if (startupId.HasValue)
            {
                var startup = await _context.Startups.FindAsync(startupId.Value);
                if (startup == null)
                    return false;
            }
            user.StartupId = startupId;
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> UpdateLastLoginDateAsync(string email)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == email);

            if (user == null)
                return false;
            user.LastLoginDate = DateTime.UtcNow;
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
