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
                query = query.Where(n => n.Category.Contains(category));
            if (!string.IsNullOrEmpty(search))
                query = query.Where(n => n.Title.Contains(search) || n.Content.Contains(search));
            return await query
                .OrderByDescending(n => n.PublishDate)
                .Select(n => new NewsDto
                {
                    Id = n.Id,
                    Title = n.Title,
                    Content = n.Content,
                    PublishDate = n.PublishDate,
                    Category = n.Category,
                    IsPublished = n.IsPublished
                })
                .ToListAsync();
        }

        public async Task<NewsDto?> GetNewsByIdAsync(int id)
        {
            var news = await _context.News.FindAsync(id);
            
            if (news == null)
                return null;
            return new NewsDto
            {
                Id = news.Id,
                Title = news.Title,
                Content = news.Content,
                PublishDate = news.PublishDate,
                Category = news.Category,
                IsPublished = news.IsPublished
            };
        }

        public async Task<NewsDto> CreateNewsAsync(NewsDto dto)
        {
            var news = new News
            {
                Title = dto.Title,
                Content = dto.Content,
                Category = dto.Category,
                IsPublished = dto.IsPublished,
                PublishDate = dto.PublishDate == default ? DateTime.UtcNow : dto.PublishDate
            };
            _context.News.Add(news);
            await _context.SaveChangesAsync();
            dto.Id = news.Id;
            dto.PublishDate = news.PublishDate;
            return dto;
        }

        public async Task<bool> UpdateNewsAsync(int id, NewsDto dto)
        {
            var news = await _context.News.FindAsync(id);
            
            if (news == null) 
                return false;
            news.Title = dto.Title;
            news.Content = dto.Content;
            news.Category = dto.Category;
            news.IsPublished = dto.IsPublished;
            if (dto.PublishDate != default)
                news.PublishDate = dto.PublishDate;
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
    }
}
