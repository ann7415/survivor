using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using JebIncubator.Api.Services;
using JebIncubator.Api.Models.DTOs;

namespace JebIncubator.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly UserService _userService;

        public UsersController(UserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetUsers([FromQuery] string? role = null, [FromQuery] string? search = null)
        {
            var users = await _userService.GetUsersAsync(role, search);
            return Ok(users);
        }

        [HttpGet("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetUser(int id)
        {
            var user = await _userService.GetUserByIdAsync(id);
            if (user == null)
                return NotFound();
            return Ok(user);
        }

        [HttpGet("by-email/{email}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetUserByEmail(string email)
        {
            var user = await _userService.GetUserByEmailAsync(email);
            if (user == null) 
                return NotFound();
            return Ok(user);
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateUser(int id, [FromBody] UserUpdateDto dto)
        {
            var updated = await _userService.UpdateUserAsync(id, dto);
            if (!updated) 
                return NotFound();
            return NoContent();
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var deleted = await _userService.DeleteUserAsync(id);
            if (!deleted) 
                return NotFound();
            return NoContent();
        }

        [HttpPatch("{id}/role")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> UpdateUserRole(int id, [FromBody] UserRoleUpdateDto dto)
        {
            var updated = await _userService.UpdateUserRoleAsync(id, dto.Role);
            if (!updated) 
                return NotFound();
            return NoContent();
        }

        [HttpPatch("{id}/startup")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> AssignUserToStartup(int id, [FromBody] UserStartupAssignmentDto dto)
        {
            var updated = await _userService.AssignUserToStartupAsync(id, dto.StartupId);
            if (!updated) 
                return NotFound();
            return NoContent();
        }
    }
}