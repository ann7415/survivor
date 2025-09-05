/*
** EPITECH PROJECT, 2025
** survivor
** File description:
** NewsService.cs
*/

using Microsoft.EntityFrameworkCore;
using JebIncubator.Api.Data;
using JebIncubator.Api.Models.DTOs;
using JebIncubator.Api.Models.Entities;

namespace JebIncubator.Api.Services
{
    public class NewsService
    {
        private readonly ApplicationDbContext _context;

        public NewsService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<NewsDto>> GetNewsAsync(string? category = null, string? search = null)
        {
            var query = _context.News.AsQueryable();

            if (!string.IsNullOrEmpty(category))
                query = query.Where(n => n.Category != null && n.Category.Contains(category));
            if (!string.IsNullOrEmpty(search))
                query = query.Where(n => n.Title.Contains(search) || (n.Description != null && n.Description.Contains(search)));

            return await query
                .OrderByDescending(n => n.NewsDate)
                .Select(n => new NewsDto
                {
                    Id = n.Id,
                    Title = n.Title,
                    Description = n.Description,
                    NewsDate = n.NewsDate,
                    Category = n.Category,
                    Location = n.Location,
                    StartupId = n.StartupId,
                    IsPublished = n.IsPublished,
                    ImageUrls = n.Images.Select(i => i.Url).ToList()
                })
                .ToListAsync();
        }

        public async Task<NewsDto?> GetNewsByIdAsync(int id)
        {
            var news = await _context.News
              .Include(n => n.Images)
              .FirstOrDefaultAsync(n => n.Id == id);
            
            if (news == null)
                return null;
            return new NewsDto
            {
                Id = news.Id,
                Title = news.Title,
                Description = news.Description,
                NewsDate = news.NewsDate,
                Location = news.Location,
                Category = news.Category,
                StartupId = news.StartupId,
                IsPublished = news.IsPublished,
                ImageUrls = news.Images.Select(i => i.Url).ToList()
            };
        }

        public async Task<NewsDto> CreateNewsAsync(NewsDto dto)
        {
            var news = new News
            {
                Title = dto.Title,
                Description = dto.Description,
                Category = dto.Category,
                IsPublished = dto.IsPublished,
                NewsDate = dto.NewsDate ?? DateTime.UtcNow,
                Location = dto.Location,
                StartupId = dto.StartupId
            };
            _context.News.Add(news);
            await _context.SaveChangesAsync();
            dto.Id = news.Id;
            dto.NewsDate = news.NewsDate;
            return dto;
        }

        public async Task<bool> UpdateNewsAsync(int id, NewsDto dto)
        {
            var news = await _context.News.FindAsync(id);
            
            if (news == null) 
                return false;
            news.Title = dto.Title;
            news.Description = dto.Description;
            news.Category = dto.Category;
            news.IsPublished = dto.IsPublished;
            if (dto.NewsDate.HasValue)
                news.NewsDate = dto.NewsDate.Value;
            news.Location = dto.Location;
            news.StartupId = dto.StartupId;

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteNewsAsync(int id)
        {
            var news = await _context.News.FindAsync(id);
            
            if (news == null) 
                return false;
            _context.News.Remove(news);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> TogglePublishStatusAsync(int id)
        {
            var news = await _context.News.FindAsync(id);
            
            if (news == null)
                return false;
            news.IsPublished = !news.IsPublished;
            await _context.SaveChangesAsync();
            return true;
        }
        
        public async Task<bool> AddImageAsync(int newsId, string imageUrl)
        {
          var news = await _context.News.Include(n => n.Images).FirstOrDefaultAsync(n => n.Id == newsId);
          if (news == null)
            return false;

          var image = new NewsImage
          {
            Url = imageUrl,
            NewsId = news.Id
          };

          news.Images.Add(image);
          await _context.SaveChangesAsync();
          return true;
        }
    }
}
