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
                        existingStartup.Status = jebStartup.Status;
                        existingStartup.UpdatedDate = DateTime.UtcNow;
                        updated++;
                        _logger.LogInformation($"Updating startup: {jebStartup.Name}");
                    }
                }

                await _context.SaveChangesAsync();
                _logger.LogInformation($"Startup sync completed: {created} created, {updated} updated");
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
                    message = "Error during startup synchronization",
                    error = ex.Message 
                });
            }
        }

        [HttpPost("news")]
        public async Task<IActionResult> SyncNews()
        {
            try
            {
                _logger.LogInformation("Starting news synchronization...");
                
                var jebNews = await _jebApiService.GetNewsFromApiAsync();
                var created = 0;
                var updated = 0;

                foreach (var newsItem in jebNews)
                {
                    var existingNews = await _context.News
                        .FirstOrDefaultAsync(n => n.ExternalApiId == newsItem.ExternalApiId);

                    if (existingNews == null)
                    {
                        _context.News.Add(newsItem);
                        created++;
                        _logger.LogInformation($"Creating new news: {newsItem.Title}");
                    }
                    else
                    {
                        existingNews.Title = newsItem.Title;
                        existingNews.Content = newsItem.Content;
                        existingNews.Category = newsItem.Category;
                        existingNews.PublishDate = newsItem.PublishDate;
                        existingNews.IsPublished = newsItem.IsPublished;
                        updated++;
                        _logger.LogInformation($"Updating news: {newsItem.Title}");
                    }
                }

                await _context.SaveChangesAsync();
                _logger.LogInformation($"News sync completed: {created} created, {updated} updated");
                return Ok(new 
                { 
                    success = true,
                    message = "Synchronisation of news completed",
                    created = created,
                    updated = updated,
                    total = jebNews.Count
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error during news synchronization");
                return StatusCode(500, new { 
                    success = false, 
                    message = "Error during news synchronization",
                    error = ex.Message 
                });
            }
        }

        [HttpPost("events")]
        public async Task<IActionResult> SyncEvents()
        {
            try
            {
                _logger.LogInformation("Starting events synchronization...");
                
                var jebEvents = await _jebApiService.GetEventsFromApiAsync();
                var created = 0;
                var updated = 0;

                foreach (var eventItem in jebEvents)
                {
                    var existingEvent = await _context.Events
                        .FirstOrDefaultAsync(e => e.ExternalApiId == eventItem.ExternalApiId);

                    if (existingEvent == null)
                    {
                        _context.Events.Add(eventItem);
                        created++;
                        _logger.LogInformation($"Creating new event: {eventItem.Title}");
                    }
                    else
                    {
                        existingEvent.Title = eventItem.Title;
                        existingEvent.Description = eventItem.Description;
                        existingEvent.Date = eventItem.Date;
                        existingEvent.Location = eventItem.Location;
                        existingEvent.Type = eventItem.Type;
                        updated++;
                        _logger.LogInformation($"Updating event: {eventItem.Title}");
                    }
                }

                await _context.SaveChangesAsync();
                
                _logger.LogInformation($"Events sync completed: {created} created, {updated} updated");

                return Ok(new 
                { 
                    success = true,
                    message = "Synchronisation of events completed",
                    created = created,
                    updated = updated,
                    total = jebEvents.Count
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error during events synchronization");
                return StatusCode(500, new { 
                    success = false, 
                    message = "Error during events synchronization",
                    error = ex.Message 
                });
            }
        }

        [HttpPost("all")]
        public async Task<IActionResult> SyncAll()
        {
            try
            {
                _logger.LogInformation("Starting full synchronization...");
                
                var startupResult = await SyncStartups();
                var newsResult = await SyncNews();
                var eventsResult = await SyncEvents();
                var startupData = ((ObjectResult)startupResult).Value as dynamic;
                var newsData = ((ObjectResult)newsResult).Value as dynamic;
                var eventsData = ((ObjectResult)eventsResult).Value as dynamic;

                return Ok(new 
                { 
                    success = true,
                    message = "Full synchronization completed",
                    summary = new 
                    {
                        startups = startupData,
                        news = newsData,
                        events = eventsData
                    }
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error during full synchronization");
                return StatusCode(500, new { 
                    success = false, 
                    message = "Error during full synchronization",
                    error = ex.Message 
                });
            }
        }

        [HttpGet("status")]
        public async Task<IActionResult> GetSyncStatus()
        {
            try
            {
                var startupCount = await _context.Startups.CountAsync();
                var newsCount = await _context.News.CountAsync();
                var eventsCount = await _context.Events.CountAsync();
                var userCount = await _context.Users.CountAsync();

                return Ok(new
                {
                    success = true,
                    message = "Current synchronization status",
                    counts = new
                    {
                        startups = startupCount,
                        news = newsCount,
                        events = eventsCount,
                        users = userCount
                    }
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching synchronization status");
                return StatusCode(500, new
                {
                    success = false,
                    message = "Error fetching synchronization status",
                    error = ex.Message
                });
            }
        }
    }
}