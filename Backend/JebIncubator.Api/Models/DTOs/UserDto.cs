using System.ComponentModel.DataAnnotations;

namespace JebIncubator.Api.Models.DTOs
{
    public class UserDto
    {
        public int Id { get; set; }
        
        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;
        
        [Required]
        public string Role { get; set; } = string.Empty;
        
        public int? StartupId { get; set; }
        public string? StartupName { get; set; }
        
        public DateTime CreatedDate { get; set; }
    }
    
    public class UserUpdateDto
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;
        
        [Required]
        public string Role { get; set; } = string.Empty;
        
        public int? StartupId { get; set; }
    }
    
    public class UserRoleUpdateDto
    {
        [Required]
        public string Role { get; set; } = string.Empty;
    }
    
    public class UserStartupAssignmentDto
    {
        public int? StartupId { get; set; }
    }
}