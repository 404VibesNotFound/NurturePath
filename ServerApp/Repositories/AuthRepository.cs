using Microsoft.EntityFrameworkCore;
using ServerApp.Data;
using ServerApp.Data.DTOs;
using ServerApp.Data.Models;

namespace ServerApp.Repositories
{
    /// <summary>
    /// Repository implementation for authentication operations
    /// Handles user registration, login, password hashing, and user group management
    /// </summary>
    public class AuthRepository : IAuthRepository
    {
        // Database context for data operations
        private readonly DatabaseContext _context;
        
        /// <summary>
        /// Initializes a new instance of the AuthRepository
        /// </summary>
        /// <param name="context">Database context for data access</param>
        public AuthRepository(DatabaseContext context)
        {
            // Inject database context dependency
            _context = context;
        }
        
        /// <summary>
        /// Authenticates a user with username and password
        /// </summary>
        /// <param name="username">Username for login</param>
        /// <param name="password">Plain text password for verification</param>
        /// <returns>User entity if authentication succeeds, null otherwise</returns>
        public async Task<User?> Login(string username, string password)
        {
            // Retrieve user from database including user group information
            var user = await _context.Users.Include(u => u.UserGroup).FirstOrDefaultAsync(x => x.Username == username); //Get user from database.
            // Check if user exists in database
            if (user == null)
                return null; // User does not exist.

            // Verify provided password against stored hash
            if (!VerifyPassword(password, user.PasswordHash, user.PasswordSalt))
                return null;

            // Return authenticated user
            return user;
        }

        /// <summary>
        /// Verifies a password against stored hash and salt
        /// </summary>
        /// <param name="password">Plain text password to verify</param>
        /// <param name="passwordHash">Stored password hash</param>
        /// <param name="passwordSalt">Stored password salt</param>
        /// <returns>True if password matches, false otherwise</returns>
        private bool VerifyPassword(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            // Create HMAC with stored salt for password verification
            using var hmac = new System.Security.Cryptography.HMACSHA512(passwordSalt);
            // Compute hash of provided password using stored salt
            var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password)); // Create hash using password salt.
            // Compare each byte of computed hash with stored hash
            for (int i = 0; i < computedHash.Length; i++)
            { // Loop through the byte array
                // Return false if any byte doesn't match
                if (computedHash[i] != passwordHash[i]) return false; // if mismatch
            }

            // Return true if all bytes match
            return true; //if no mismatches.
        }

        /// <summary>
        /// Registers a new user with hashed password
        /// </summary>
        /// <param name="user">User entity to register</param>
        /// <param name="password">Plain text password to hash and store</param>
        /// <returns>The registered user entity</returns>
        public async Task<User> Register(User user, string password)
        {
            // Variables to store password hash and salt
            byte[] passwordHash;
            byte[] passwordSalt;
            // Generate password hash and salt
            CreatePasswordHash(password, out passwordHash, out passwordSalt);

            // Set hashed password and salt on user entity
            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;

            // Add user to database context
            await _context.Users.AddAsync(user); // Adding the user to context of users.
            // Save changes to database
            await _context.SaveChangesAsync(); // Save changes to database.

            // Return registered user
            return user;
        }

        /// <summary>
        /// Creates a password hash and salt using HMAC-SHA512
        /// </summary>
        /// <param name="password">Plain text password to hash</param>
        /// <param name="passwordHash">Output parameter for password hash</param>
        /// <param name="passwordSalt">Output parameter for password salt</param>
        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            // Create HMAC-SHA512 instance for password hashing
            using var hmac = new System.Security.Cryptography.HMACSHA512();
            // Use HMAC key as password salt
            passwordSalt = hmac.Key;
            // Compute hash of password using generated salt
            passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
        }

        /// <summary>
        /// Checks if a user with the given username already exists
        /// </summary>
        /// <param name="username">Username to check for existence</param>
        /// <returns>True if user exists, false otherwise</returns>
        public async Task<bool> UserExists(string username)
        {
            // Check if any user exists with the given username
            if (await _context.Users.AnyAsync(x => x.Username == username))
                return true;
            // Return false if no user found
            return false;
        }

        /// <summary>
        /// Retrieves all available user groups as DTOs
        /// </summary>
        /// <returns>List of user group DTOs</returns>
        public async Task<IList<UserGroupDto>> UserGroups()
        {
            // Fetch all user groups from database
            var groups = await _context.UserGroups.ToListAsync();
            // Convert entities to DTOs with null safety
            var dtoList = groups.Select(userGroup => new UserGroupDto { 
                Id = userGroup.Id, 
                GroupName = userGroup.GroupName ?? string.Empty // Handle potential null values
            }).ToList();
            // Return DTO list
            return dtoList;
        }
    }
}
