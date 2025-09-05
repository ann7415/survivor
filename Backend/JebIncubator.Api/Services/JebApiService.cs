/*
** EPITECH PROJECT, 2025
** survivor
** File description:
** JebApiService.cs
*/

using JebIncubator.Api.Models;
using JebIncubator.Api.Models.Entities;
using JebIncubator.Api.Mappers;
using System.Text.Json;

namespace JebIncubator.Api.Services
{
    public class JebApiService
    {
        private readonly HttpClient _httpClient;
        private readonly ILogger<JebApiService> _logger;
        private readonly IWebHostEnvironment _environment;

        public JebApiService(HttpClient httpClient, ILogger<JebApiService> logger, IWebHostEnvironment environment)
        {
            _httpClient = httpClient;
            _logger = logger;
            _environment = environment;

            var baseUrl = Environment.GetEnvironmentVariable("EXTERNAL_API_JEB_BASE_URL") 
                ?? throw new InvalidOperationException("EXTERNAL_API_JEB_BASE_URL must be set");
            var token = Environment.GetEnvironmentVariable("EXTERNAL_API_GROUP_TOKEN") 
                ?? throw new InvalidOperationException("EXTERNAL_API_GROUP_TOKEN must be set");

            _httpClient.BaseAddress = new Uri(baseUrl);
            _httpClient.DefaultRequestHeaders.Add("X-Group-Authorization", token);
        }

        public async Task<List<Startup>> GetStartupsFromApiAsync()
        {
            var jebStartups = await FetchFromApiAsync<List<JebApiStartup>>("/startups");
            return jebStartups?.ToStartups() ?? new List<Startup>();
        }

		public async Task<List<News>> GetNewsFromApiAsync()
		{
    		var jebNews = await FetchFromApiAsync<List<JebApiNews>>("/news");
    		if (jebNews == null)
				return new List<News>();

    		var newsList = new List<News>();
    		foreach (var jn in jebNews)
    		{
        		var imageUrls = await GetNewsImagesFromApiAsync(jn.Id);
        		newsList.Add(jn.ToNews(imageUrls));
    		}
    		return newsList;
		}

        public async Task<List<Event>> GetEventsFromApiAsync()
        {
            var jebEvents = await FetchFromApiAsync<List<JebApiEvent>>("/events");
            return jebEvents?.ToEventsList() ?? new List<Event>();
        }

        private async Task<T?> FetchFromApiAsync<T>(string url) where T : class
        {
            try
            {
                _logger.LogInformation($"Fetching {typeof(T).Name} from JEB API: {url}");
                var response = await _httpClient.GetAsync(url);

                if (!response.IsSuccessStatusCode)
                {
                    var errorContent = await response.Content.ReadAsStringAsync();
                    _logger.LogWarning($"API Error {response.StatusCode}: {errorContent}");
                    return null;
                }

                var content = await response.Content.ReadAsStringAsync();
                var options = new JsonSerializerOptions { PropertyNameCaseInsensitive = true };
                return JsonSerializer.Deserialize<T>(content, options);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error fetching {typeof(T).Name} from API");
                return null;
            }
        }

        public async Task<List<string>> GetNewsImagesFromApiAsync(int newsId)
        {
            try
            {
                var response = await _httpClient.GetAsync($"/news/{newsId}/image");
                response.EnsureSuccessStatusCode();
                _logger.LogInformation($"News image response: {response.StatusCode}");

                var bytes = await response.Content.ReadAsByteArrayAsync();
                var fileName = $"news_{newsId}.png";
                var imagesPath = Path.Combine(_environment.ContentRootPath, "wwwroot", "images");
                if (!Directory.Exists(imagesPath))
                    Directory.CreateDirectory(imagesPath);

                var path = Path.Combine(imagesPath, fileName);
                await File.WriteAllBytesAsync(path, bytes);

                return new List<string> { $"/images/{fileName}" };
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error fetching images for news {newsId}");
                return new List<string>();
            }
        }
    }
}
