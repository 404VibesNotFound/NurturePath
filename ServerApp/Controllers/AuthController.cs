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
        /// Registers a new user in the system
        /// </summary>
        /// <param name="userForRegisterDto">User registration data including username, password, and group</param>
        /// <returns>HTTP 201 Created on success, BadRequest on validation failure or duplicate username</returns>
        [HttpPost("register")] //<host>/api/auth/register
        public async Task<IActionResult> Register([FromBody] UserForRegisterDto userForRegisterDto)
        { //Data Transfer Object containing username and password.
            // Validate the incoming request data against model validation rules
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            // Convert username to lowercase for consistent storage and comparison
            userForRegisterDto.Username = userForRegisterDto.Username.ToLower(); //Convert username to lower case before storing in database.

            // Check if a user with this username already exists
            if (await _repo.UserExists(userForRegisterDto.Username))
                return BadRequest("Username is already taken");

            // Create new user entity with provided data
            var userToCreate = new User
            {
                // Set username from DTO
                Username = userForRegisterDto.Username,
                // Assign user to specified group
                UserGroupId = userForRegisterDto.Group
            };

            // Register the user with hashed password in repository
            await _repo.Register(userToCreate, userForRegisterDto.Password);

            // Return HTTP 201 Created status
            return StatusCode(201);
        }

        /// <summary>
        /// Authenticates a user and returns a JWT token on successful login
        /// </summary>
        /// <param name="userForRegisterDto">User login credentials including username and password</param>
        /// <returns>JWT token on success, Unauthorized on invalid credentials, Internal Server Error on configuration issues</returns>
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UserForLoginDto userForRegisterDto)
        {
            // Attempt to authenticate user with provided credentials
            var userFromRepo = await _repo.Login(userForRegisterDto.Username.ToLower(), userForRegisterDto.Password);
            // Check if authentication failed
            if (userFromRepo == null) //User login failed
                return Unauthorized();

            // Prepare JWT token generation components
            var tokenHandler = new JwtSecurityTokenHandler();
            // Retrieve JWT secret from configuration

            var secret = Environment.GetEnvironmentVariable("APPSETTINGS_SECRET");
            var value = "";
            if (secret != null)
            {
                value = secret;
            }
            else
            {
                value = _config.GetSection("AppSettings:Secret").Value;
            }
            
            if (value != null)
            {
                // Convert secret to byte array for signing
                var key = Encoding.ASCII.GetBytes(value);
                // Create token descriptor with user claims
                var tokenDescriptor = new SecurityTokenDescriptor
                {
                    // Set user identity claims (ID, username, role)
                    Subject = new ClaimsIdentity(new Claim[]{
                        new Claim(ClaimTypes.NameIdentifier,userFromRepo.Id.ToString()),
                        new Claim(ClaimTypes.Name, userFromRepo.Username),
                        new Claim(ClaimTypes.Role, userFromRepo.UserGroupId.ToString())
                    }),
                    // Set token expiration to 24 hours from now
                    Expires = DateTime.Now.AddDays(1),
                    // Configure token signing with HMAC-SHA512
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha512Signature)
                };

                // Generate the actual JWT token
                var token = tokenHandler.CreateToken(tokenDescriptor);
                // Convert token to string format
                var tokenString = tokenHandler.WriteToken(token);

                // Return token in response body
                return Ok(new { tokenString });
            }

            // Return error if JWT configuration is missing
            return StatusCode(500);
        }

        /// <summary>
        /// Retrieves all available user groups for registration purposes
        /// </summary>
        /// <returns>List of available user groups with their IDs and names</returns>
        [HttpGet("get-user-groups")] //<host>/api/auth/get-user-groups
        public async Task<IActionResult> UserGroups()
        {
            // Fetch all user groups from repository
            var groups = await _repo.UserGroups();
            // Return groups as JSON response
            return Ok(groups);
        }
    }
}
