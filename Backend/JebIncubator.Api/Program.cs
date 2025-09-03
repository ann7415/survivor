using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using JebIncubator.Api.Data;
using JebIncubator.Api.Services;
using DotNetEnv;

// Charger les variables d'environnement depuis le fichier .env
Env.Load();

var builder = WebApplication.CreateBuilder(args);

// Configuration Database depuis les variables d'environnement
var connectionString = Environment.GetEnvironmentVariable("DATABASE_CONNECTION_STRING") ?? "Data Source=JebIncubatorDb.db";
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlite(connectionString));

// Configuration JWT depuis les variables d'environnement
var jwtSecretKey = Environment.GetEnvironmentVariable("JWT_SECRET_KEY") ?? throw new InvalidOperationException("JWT_SECRET_KEY must be set in environment variables");
var jwtIssuer = Environment.GetEnvironmentVariable("JWT_ISSUER") ?? throw new InvalidOperationException("JWT_ISSUER must be set in environment variables");
var jwtAudience = Environment.GetEnvironmentVariable("JWT_AUDIENCE") ?? throw new InvalidOperationException("JWT_AUDIENCE must be set in environment variables");

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = jwtIssuer,
            ValidAudience = jwtAudience,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSecretKey))
        };
    });

// Services
builder.Services.AddScoped<JebApiService>();
builder.Services.AddScoped<AuthService>();
builder.Services.AddScoped<StartupService>();
builder.Services.AddScoped<UserService>();
builder.Services.AddScoped<NewsService>();
builder.Services.AddScoped<EventService>();
builder.Services.AddHttpClient();

// Controllers
builder.Services.AddControllers();

// CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularApp",
        policy =>
        {
            policy.WithOrigins("http://localhost:4200")
                  .AllowAnyHeader()
                  .AllowAnyMethod()
                  .AllowCredentials();
        });
});

// Swagger pour dev
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowAngularApp");
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

// Initialiser la DB avec des données de TEST
using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();
    context.Database.Migrate();
    
    if (!context.Users.Any())
    {
        var adminUser = new JebIncubator.Api.Models.Entities.User
        {
            Email = "admin@jeb.com",
            PasswordHash = BCrypt.Net.BCrypt.HashPassword("admin123"),
            Role = "Admin"
        };
        context.Users.Add(adminUser);
        
        var startups = new[]
        {
            new JebIncubator.Api.Models.Entities.Startup 
            { 
                Name = "TechCorp", 
                Description = "Innovation en IA", 
                Sector = "Technology",
                Location = "Paris",
                Website = "https://techcorp.com",
                ContactEmail = "contact@techcorp.com"
            },
            new JebIncubator.Api.Models.Entities.Startup 
            { 
                Name = "EcoStart", 
                Description = "Solutions écologiques", 
                Sector = "Environment",
                Location = "Lyon",
                Website = "https://ecostart.fr",
                ContactEmail = "hello@ecostart.fr"
            }
        };
        
        context.Startups.AddRange(startups);
        context.SaveChanges();
    }
}

app.Run();