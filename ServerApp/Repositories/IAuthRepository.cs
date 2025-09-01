using ServerApp.Data.DTOs;
using ServerApp.Data.Models;

namespace ServerApp.Repositories
{
    /// <summary>
    /// Interface for authentication repository operations
    /// Defines contracts for user registration, login, and user group management
    /// Enhanced for healthcare communication platform with role-based authentication
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
        /// Authenticates a user with username/email and password
        /// </summary>
        /// <param name="emailOrUsername">Email or username for authentication</param>
        /// <param name="password">Plain text password for verification</param>
        /// <returns>User entity if authentication succeeds, null otherwise</returns>
        Task<User?> Login(string emailOrUsername, string password);
        
        /// <summary>
        /// Checks if a user with the given username already exists
        /// </summary>
        /// <param name="username">Username to check for existence</param>
        /// <returns>True if user exists, false otherwise</returns>
        Task<bool> UserExists(string username);
        
        /// <summary>
        /// Checks if a user with the given email already exists
        /// </summary>
        /// <param name="email">Email to check for existence</param>
        /// <returns>True if user exists, false otherwise</returns>
        Task<bool> EmailExists(string email);
        
        /// <summary>
        /// Retrieves all available user groups (legacy support)
        /// </summary>
        /// <returns>List of user group DTOs</returns>
        Task<IList<UserGroupDto>> UserGroups();
        
        /// <summary>
        /// Gets user by ID
        /// </summary>
        /// <param name="userId">User ID</param>
        /// <returns>User entity if found, null otherwise</returns>
        Task<User?> GetUserById(int userId);
        
        /// <summary>
        /// Gets user by email
        /// </summary>
        /// <param name="email">Email address</param>
        /// <returns>User entity if found, null otherwise</returns>
        Task<User?> GetUserByEmail(string email);
        
        /// <summary>
        /// Gets users by role
        /// </summary>
        /// <param name="role">User role to filter by</param>
        /// <returns>List of users with the specified role</returns>
        Task<IList<User>> GetUsersByRole(UserRole role);
    }
}
