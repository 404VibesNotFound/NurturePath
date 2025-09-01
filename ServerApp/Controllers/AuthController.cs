using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using ServerApp.Repositories;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using ServerApp.Data.DTOs;
using ServerApp.Data.Models;

namespace ServerApp.Controllers
{
    /// <summary>
    /// Handles authentication operations including user registration, login, and user group management
    /// Enhanced for healthcare communication platform with role-based authentication
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        // Repository for authentication operations
        private readonly IAuthRepository _repo;
        // Configuration service for accessing app settings
        private readonly IConfiguration _config;

        /// <summary>
        /// Initializes a new instance of the AuthController
        /// </summary>
        /// <param name="repo">Authentication repository for data operations</param>
        /// <param name="config">Configuration service for app settings</param>
        public AuthController(IAuthRepository repo, IConfiguration config)
        {
            // Inject authentication repository dependency
            _repo = repo;
            // Inject configuration dependency for JWT settings
            _config = config;
        }

        /// <summary>
        /// Registers a new user in the healthcare communication system
        /// </summary>
        /// <param name="userForRegisterDto">User registration data including email, name, password, and role</param>
        /// <returns>HTTP 201 Created on success, BadRequest on validation failure or duplicate email</returns>
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] UserForRegisterDto userForRegisterDto)
        {
            // Validate the incoming request data against model validation rules
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            // Convert email to lowercase for consistent storage and comparison
            userForRegisterDto.Email = userForRegisterDto.Email.ToLower();

            // Check if a user with this email already exists
            if (await _repo.EmailExists(userForRegisterDto.Email))
                return BadRequest("Email is already registered");

            // Generate username from email if not provided (for legacy compatibility)
            var username = userForRegisterDto.Username ?? userForRegisterDto.Email.Split('@')[0];
            
            // Check if username already exists (for legacy support)
            if (await _repo.UserExists(username))
            {
                // Generate a unique username by appending timestamp
                username = $"{username}_{DateTime.UtcNow.Ticks}";
            }

            // Create new user entity with provided data
            var userToCreate = new User
            {
                Email = userForRegisterDto.Email,
                Username = username,
                FirstName = userForRegisterDto.FirstName,
                LastName = userForRegisterDto.LastName,
                Role = userForRegisterDto.Role,
                UserGroupId = userForRegisterDto.Group // Legacy support
            };

            // Register the user with hashed password in repository
            var createdUser = await _repo.Register(userToCreate, userForRegisterDto.Password);

            // Return HTTP 201 Created status with user info (excluding sensitive data)
            return StatusCode(201, new 
            { 
                Id = createdUser.Id,
                Email = createdUser.Email,
                FirstName = createdUser.FirstName,
                LastName = createdUser.LastName,
                Role = createdUser.Role.ToString(),
                Message = "User registered successfully"
            });
        }

        /// <summary>
        /// Authenticates a user and returns a JWT token on successful login
        /// </summary>
        /// <param name="userForLoginDto">User login credentials including email/username and password</param>
        /// <returns>JWT token on success, Unauthorized on invalid credentials, Internal Server Error on configuration issues</returns>
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UserForLoginDto userForLoginDto)
        {
            // Support both legacy username and new email-based login
            var emailOrUsername = userForLoginDto.EmailOrUsername ?? userForLoginDto.Username;
            
            if (string.IsNullOrEmpty(emailOrUsername))
                return BadRequest("Email or username is required");

            // Attempt to authenticate user with provided credentials
            var userFromRepo = await _repo.Login(emailOrUsername.ToLower(), userForLoginDto.Password);
            
            // Check if authentication failed
            if (userFromRepo == null)
                return Unauthorized("Invalid credentials");

            // Prepare JWT token generation components
            var tokenHandler = new JwtSecurityTokenHandler();
            
            // Retrieve JWT secret from configuration
            var secret = Environment.GetEnvironmentVariable("APPSETTINGS_SECRET");
            if (string.IsNullOrEmpty(secret))
            {
                secret = _config.GetSection("AppSettings:Secret").Value;
            }
            
            if (string.IsNullOrEmpty(secret))
            {
                return StatusCode(500, "JWT configuration is missing");
            }

            // Convert secret to byte array for signing
            var key = Encoding.ASCII.GetBytes(secret);
            
            // Create token descriptor with user claims
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                // Set user identity claims (ID, email, name, role)
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.NameIdentifier, userFromRepo.Id.ToString()),
                    new Claim(ClaimTypes.Email, userFromRepo.Email),
                    new Claim(ClaimTypes.Name, $"{userFromRepo.FirstName} {userFromRepo.LastName}"),
                    new Claim(ClaimTypes.GivenName, userFromRepo.FirstName),
                    new Claim(ClaimTypes.Surname, userFromRepo.LastName),
                    new Claim(ClaimTypes.Role, userFromRepo.Role.ToString()),
                    new Claim("Role", userFromRepo.Role.ToString()),
                    // Legacy support
                    new Claim("UserGroupId", userFromRepo.UserGroupId?.ToString() ?? "0")
                }),
                // Set token expiration to 24 hours from now
                Expires = DateTime.UtcNow.AddDays(1),
                // Configure token signing with HMAC-SHA512
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha512Signature)
            };

            // Generate the actual JWT token
            var token = tokenHandler.CreateToken(tokenDescriptor);
            // Convert token to string format
            var tokenString = tokenHandler.WriteToken(token);

            // Return token and user information in response body
            return Ok(new 
            { 
                Token = tokenString,
                User = new 
                {
                    Id = userFromRepo.Id,
                    Email = userFromRepo.Email,
                    FirstName = userFromRepo.FirstName,
                    LastName = userFromRepo.LastName,
                    Role = userFromRepo.Role.ToString(),
                    FullName = $"{userFromRepo.FirstName} {userFromRepo.LastName}"
                }
            });
        }

        /// <summary>
        /// Retrieves all available user groups for registration purposes (legacy support)
        /// </summary>
        /// <returns>List of available user groups with their IDs and names</returns>
        [HttpGet("get-user-groups")]
        public async Task<IActionResult> UserGroups()
        {
            // Fetch all user groups from repository
            var groups = await _repo.UserGroups();
            // Return groups as JSON response
            return Ok(groups);
        }

        /// <summary>
        /// Gets available user roles for registration
        /// </summary>
        /// <returns>List of available user roles</returns>
        [HttpGet("roles")]
        public IActionResult GetRoles()
        {
            var roles = Enum.GetValues<UserRole>()
                .Select(role => new 
                {
                    Id = (int)role,
                    Name = role.ToString(),
                    Description = GetRoleDescription(role)
                })
                .ToList();

            return Ok(roles);
        }

        /// <summary>
        /// Gets description for user roles
        /// </summary>
        /// <param name="role">User role</param>
        /// <returns>Role description</returns>
        private string GetRoleDescription(UserRole role)
        {
            return role switch
            {
                UserRole.Patient => "Expecting mothers and patients receiving care",
                UserRole.Provider => "Healthcare providers (midwives, doctors, nurses)",
                UserRole.Family => "Family members with authorized access",
                _ => role.ToString()
            };
        }
    }
}
