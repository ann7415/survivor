using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using JebIncubator.Api.Services;
using JebIncubator.Api.Models.DTOs;

namespace JebIncubator.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StartupsController : ControllerBase
    {
        private readonly StartupService _startupService;

        public StartupsController(StartupService startupService)
        {
            _startupService = startupService;
        }

        [HttpGet]
        public async Task<IActionResult> GetStartups([FromQuery] string? search = null)
        {
            var startups = await _startupService.GetStartupsAsync(search);
            return Ok(startups);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetStartup(int id)
        {
            var startup = await _startupService.GetStartupByIdAsync(id);
            if (startup == null) return NotFound();
            return Ok(startup);
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> CreateStartup([FromBody] StartupDto dto)
        {
            var created = await _startupService.CreateStartupAsync(dto);
            return CreatedAtAction(nameof(GetStartup), new { id = created.Id }, created);
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Admin,Startup")]
        public async Task<IActionResult> UpdateStartup(int id, [FromBody] StartupDto dto)
        {
            var updated = await _startupService.UpdateStartupAsync(id, dto);
            if (!updated) return NotFound();
            return NoContent();
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteStartup(int id)
        {
            var deleted = await _startupService.DeleteStartupAsync(id);
            if (!deleted) return NotFound();
            return NoContent();
        }
    }
}