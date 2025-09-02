using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using JebIncubator.Api.Data;
using JebIncubator.Api.Services;

namespace JebIncubator.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "Admin")]
    public class SyncController : ControllerBase
    {
        private readonly JebApiService _jebApiService;
        private readonly ApplicationDbContext _context;
        private readonly ILogger<SyncController> _logger;

        public SyncController(JebApiService jebApiService, ApplicationDbContext context, ILogger<SyncController> logger)
        {
            _jebApiService = jebApiService;
            _context = context;
            _logger = logger;
        }

        [HttpPost("startups")]
        public async Task<IActionResult> SyncStartups()
        {
            try
            {
                _logger.LogInformation("Starting startup synchronization...");
                
                var jebStartups = await _jebApiService.GetStartupsFromApiAsync();
                var created = 0;
                var updated = 0;

                foreach (var jebStartup in jebStartups)
                {
                    var existingStartup = await _context.Startups
                        .FirstOrDefaultAsync(s => s.ExternalApiId == jebStartup.ExternalApiId);

                    if (existingStartup == null)
                    {
                        _context.Startups.Add(jebStartup);
                        created++;
                        _logger.LogInformation($"Creating new startup: {jebStartup.Name}");
                    }
                    else
                    {
                        existingStartup.Name = jebStartup.Name;
                        existingStartup.Description = jebStartup.Description;
                        existingStartup.Sector = jebStartup.Sector;
                        existingStartup.Location = jebStartup.Location;
                        existingStartup.Website = jebStartup.Website;
                        existingStartup.ContactEmail = jebStartup.ContactEmail;
                        existingStartup.UpdatedDate = DateTime.UtcNow;
                        updated++;
                        _logger.LogInformation($"Updating startup: {jebStartup.Name}");
                    }
                }

                await _context.SaveChangesAsync();
                
                _logger.LogInformation($"Sync completed: {created} created, {updated} updated");

                return Ok(new 
                { 
                    success = true,
                    message = "Synchronisation of startups completed",
                    created = created,
                    updated = updated,
                    total = jebStartups.Count
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error during startup synchronization");
                return StatusCode(500, new { 
                    success = false, 
                    message = "Error during synchronization",
                    error = ex.Message 
                });
            }
        }
    }
}