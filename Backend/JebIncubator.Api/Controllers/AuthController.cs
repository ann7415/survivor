/*
** EPITECH PROJECT, 2025
** survivor
** File description:
** AuthController.cs
*/

using Microsoft.AspNetCore.Mvc;
using JebIncubator.Api.Services;
using JebIncubator.Api.Models.DTOs;

namespace JebIncubator.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AuthService _authService;
        private readonly UserService _userService;

        public AuthController(AuthService authService, UserService userService)
        {
            _authService = authService;
            _userService = userService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
        {
            var result = await _authService.LoginAsync(loginDto);

            if (result.Success) {
                await _userService.UpdateLastLoginDateAsync(loginDto.Email);
                return Ok(new { token = result.Token, message = result.Message });
            }
            return Unauthorized(new { message = result.Message });
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto registerDto)
        {
            var result = await _authService.RegisterAsync(registerDto);

            if (result.Success)
                return Ok(new { message = result.Message });
            return BadRequest(new { message = result.Message });
        }
    }
}
