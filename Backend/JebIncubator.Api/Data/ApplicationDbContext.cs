using Microsoft.EntityFrameworkCore;
using JebIncubator.Api.Models.Entities;

namespace JebIncubator.Api.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Startup> Startups { get; set; }
        public DbSet<News> News { get; set; }
        public DbSet<Event> Events { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Configuration User
            modelBuilder.Entity<User>()
                .HasIndex(u => u.Email)
                .IsUnique();

            // Configuration Startup
            modelBuilder.Entity<Startup>()
                .HasIndex(s => s.ExternalApiId)
                .IsUnique()
                .HasFilter("[ExternalApiId] IS NOT NULL");

            // Configuration News
            modelBuilder.Entity<News>()
                .HasIndex(n => n.ExternalApiId)
                .IsUnique()
                .HasFilter("[ExternalApiId] IS NOT NULL");

            // Configuration Event
            modelBuilder.Entity<Event>()
                .HasIndex(e => e.ExternalApiId)
                .IsUnique()
                .HasFilter("[ExternalApiId] IS NOT NULL");

            // Relations
            modelBuilder.Entity<User>()
                .HasOne(u => u.Startup)
                .WithMany(s => s.Users)
                .HasForeignKey(u => u.StartupId)
                .OnDelete(DeleteBehavior.SetNull);

            base.OnModelCreating(modelBuilder);
        }
    }
}