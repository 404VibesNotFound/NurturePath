using ServerApp.Data.DTOs;
using ServerApp.Data.Models;

namespace ServerApp.Repositories
{
    /// <summary>
    /// Interface for authentication repository operations
    /// Defines contracts for user registration, login, and user group management
    /// </summary>
    public interface IAuthRepository
    {
        /// <summary>
        /// Registers a new user with hashed password
        /// </summary>
        /// <param name="user">User entity to register</param>
        /// <param name="password">Plain text password to hash and store</param>
        /// <returns>The registered user entity</returns>
        Task<User> Register(User user, string password);
        
        /// <summary>
        /// Authenticates a user with username and password
        /// </summary>
        /// <param name="username">Username for authentication</param>
        /// <param name="password">Plain text password for verification</param>
        /// <returns>User entity if authentication succeeds, null otherwise</returns>
        Task<User?> Login(string username, string password);
        
        /// <summary>
        /// Checks if a user with the given username already exists
        /// </summary>
        /// <param name="username">Username to check for existence</param>
        /// <returns>True if user exists, false otherwise</returns>
        Task<bool> UserExists(string username);
        
        /// <summary>
        /// Retrieves all available user groups
        /// </summary>
        /// <returns>List of user group DTOs</returns>
        Task<IList<UserGroupDto>> UserGroups();
    }
}
