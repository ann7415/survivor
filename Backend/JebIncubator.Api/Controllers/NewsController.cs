/*
** EPITECH PROJECT, 2025
** survivor
** File description:
** NewsController.cs
*/

using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using JebIncubator.Api.Services;
using JebIncubator.Api.Models.DTOs;

namespace JebIncubator.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class NewsController : ControllerBase
    {
        private readonly NewsService _newsService;

        public NewsController(NewsService newsService)
        {
            _newsService = newsService;
        }

        [HttpGet]
        public async Task<IActionResult> GetNews([FromQuery] string? category = null, [FromQuery] string? search = null)
        {
            var news = await _newsService.GetNewsAsync(category, search);
            return Ok(news);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetNews(int id)
        {
            var news = await _newsService.GetNewsByIdAsync(id);
            if (news == null) 
                return NotFound();
            return Ok(news);
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> CreateNews([FromBody] NewsDto dto)
        {
            var created = await _newsService.CreateNewsAsync(dto);
            return CreatedAtAction(nameof(GetNews), new { id = created.Id }, created);
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateNews(int id, [FromBody] NewsDto dto)
        {
            var updated = await _newsService.UpdateNewsAsync(id, dto);
            if (!updated) 
                return NotFound();
            return NoContent();
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteNews(int id)
        {
            var deleted = await _newsService.DeleteNewsAsync(id);
            if (!deleted) 
                return NotFound();
            return NoContent();
        }

        [HttpPatch("{id}/publish")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> TogglePublishStatus(int id)
        {
            var result = await _newsService.TogglePublishStatusAsync(id);
            if (!result) 
                return NotFound();
            return NoContent();
        }
    }
}
