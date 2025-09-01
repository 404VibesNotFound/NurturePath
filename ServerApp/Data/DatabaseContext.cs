using Microsoft.EntityFrameworkCore;
using ServerApp.Data.Models;

namespace ServerApp.Data
{
    /// <summary>
    /// Entity Framework database context for the ServerApp application
    /// Manages database connections and entity configurations
    /// </summary>
    public class DatabaseContext : DbContext
    {
        /// <summary>
        /// Initializes a new instance of the DatabaseContext
        /// </summary>
        /// <param name="options">Database context options including connection string</param>
        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options) { }
        
        // Entity sets representing database tables
        public DbSet<User> Users { get; set; } // Users table for authentication
        public DbSet<UserGroup> UserGroups { get; set; } // User groups table for roles
        public DbSet<Todo> Todos { get; set; } // Todos table for task management

        /// <summary>
        /// Configures entity relationships and database schema
        /// </summary>
        /// <param name="modelBuilder">Model builder for entity configuration</param>
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Configure the one-to-many relationship between User and UserGroup
            modelBuilder.Entity<User>()
                // Each user belongs to one user group
                .HasOne(u => u.UserGroup)
                // Each user group can have many users
                .WithMany(g => g.Users)
                // Foreign key relationship using UserGroupId
                .HasForeignKey(u => u.UserGroupId);
        }
    }
}
