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

        public JebApiService(HttpClient httpClient, ILogger<JebApiService> logger)
        {
            _httpClient = httpClient;
            _logger = logger;

            var baseUrl = Environment.GetEnvironmentVariable("EXTERNAL_API_JEB_BASE_URL") 
                ?? throw new InvalidOperationException("EXTERNAL_API_JEB_BASE_URL must be set");
            var token = Environment.GetEnvironmentVariable("EXTERNAL_API_GROUP_TOKEN") 
                ?? throw new InvalidOperationException("EXTERNAL_API_GROUP_TOKEN must be set");

            _httpClient.BaseAddress = new Uri(baseUrl);
            _httpClient.DefaultRequestHeaders.Add("X-Group-Authorization", token);
            _logger.LogInformation($"JEB API configured: {baseUrl} with token: {token[..8]}...");
        }

        public async Task<List<Startup>> GetStartupsFromApiAsync()
        {
            var jebStartups = await FetchFromApiAsync<List<JebApiStartup>>("/startups");
            return jebStartups?.ToStartups() ?? new List<Startup>();
        }

        public async Task<List<News>> GetNewsFromApiAsync()
        {
            var jebNews = await FetchFromApiAsync<List<JebApiNews>>("/news");
            return jebNews?.ToNewsList() ?? new List<News>();
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
    }
}
