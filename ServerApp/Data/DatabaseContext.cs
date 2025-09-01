using Microsoft.EntityFrameworkCore;
using ServerApp.Data.Models;

namespace ServerApp.Data
{
    /// <summary>
    /// Entity Framework database context for the ServerApp application
    /// Manages database connections and entity configurations for healthcare communication system
    /// </summary>
    public class DatabaseContext : DbContext
    {
        /// <summary>
        /// Initializes a new instance of the DatabaseContext
        /// </summary>
        /// <param name="options">Database context options including connection string</param>
        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options) { }
        
        // Legacy entity sets
        public DbSet<User> Users { get; set; } // Users table for authentication
        public DbSet<UserGroup> UserGroups { get; set; } // User groups table for roles (legacy)
        public DbSet<Todo> Todos { get; set; } // Todos table for task management
        
        // New messaging system entities
        public DbSet<Message> Messages { get; set; } // Messages table for secure communication
        public DbSet<MessageAttachment> MessageAttachments { get; set; } // File attachments for messages
        public DbSet<MessageReadStatus> MessageReadStatuses { get; set; } // Message read tracking
        public DbSet<PatientProviderRelationship> PatientProviderRelationships { get; set; } // Provider-patient relationships
        public DbSet<FamilyAccess> FamilyAccesses { get; set; } // Family member access permissions
        
        // Patient care coordination entities
        public DbSet<Patient> Patients { get; set; } // Patient records with medical information
        public DbSet<PatientAlert> PatientAlerts { get; set; } // Patient alerts and notifications
        public DbSet<CareTask> CareTasks { get; set; } // Care coordination tasks

        /// <summary>
        /// Configures entity relationships and database schema
        /// </summary>
        /// <param name="modelBuilder">Model builder for entity configuration</param>
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Legacy User-UserGroup relationship (maintaining backward compatibility)
            modelBuilder.Entity<User>()
                .HasOne(u => u.UserGroup)
                .WithMany(g => g.Users)
                .HasForeignKey(u => u.UserGroupId)
                .IsRequired(false); // Make optional for new role-based system

            // User email uniqueness
            modelBuilder.Entity<User>()
                .HasIndex(u => u.Email)
                .IsUnique();

            // Message relationships
            modelBuilder.Entity<Message>()
                .HasOne(m => m.Sender)
                .WithMany(u => u.SentMessages)
                .HasForeignKey(m => m.SenderId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Message>()
                .HasOne(m => m.Receiver)
                .WithMany(u => u.ReceivedMessages)
                .HasForeignKey(m => m.ReceiverId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Message>()
                .HasOne(m => m.ReplyToMessage)
                .WithMany(m => m.Replies)
                .HasForeignKey(m => m.ReplyToMessageId)
                .IsRequired(false)
                .OnDelete(DeleteBehavior.Restrict);

            // Message attachment relationships
            modelBuilder.Entity<MessageAttachment>()
                .HasOne(ma => ma.Message)
                .WithMany(m => m.Attachments)
                .HasForeignKey(ma => ma.MessageId)
                .OnDelete(DeleteBehavior.Cascade);

            // Message read status relationships
            modelBuilder.Entity<MessageReadStatus>()
                .HasOne(mrs => mrs.Message)
                .WithMany(m => m.ReadStatuses)
                .HasForeignKey(mrs => mrs.MessageId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<MessageReadStatus>()
                .HasOne(mrs => mrs.User)
                .WithMany()
                .HasForeignKey(mrs => mrs.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            // Patient-Provider relationship configurations
            modelBuilder.Entity<PatientProviderRelationship>()
                .HasOne(ppr => ppr.Patient)
                .WithMany(u => u.PatientRelationships)
                .HasForeignKey(ppr => ppr.PatientId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<PatientProviderRelationship>()
                .HasOne(ppr => ppr.Provider)
                .WithMany(u => u.ProviderRelationships)
                .HasForeignKey(ppr => ppr.ProviderId)
                .OnDelete(DeleteBehavior.Restrict);

            // Family access relationships
            modelBuilder.Entity<FamilyAccess>()
                .HasOne(fa => fa.Patient)
                .WithMany(u => u.PatientFamilyAccess)
                .HasForeignKey(fa => fa.PatientId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<FamilyAccess>()
                .HasOne(fa => fa.FamilyMember)
                .WithMany(u => u.FamilyMemberAccess)
                .HasForeignKey(fa => fa.FamilyMemberId)
                .OnDelete(DeleteBehavior.Restrict);

            // Configure composite unique constraints
            modelBuilder.Entity<MessageReadStatus>()
                .HasIndex(mrs => new { mrs.MessageId, mrs.UserId })
                .IsUnique();

            modelBuilder.Entity<PatientProviderRelationship>()
                .HasIndex(ppr => new { ppr.PatientId, ppr.ProviderId, ppr.RelationshipType })
                .IsUnique();

            // Configure field constraints
            modelBuilder.Entity<Message>()
                .Property(m => m.Subject)
                .HasMaxLength(200);

            modelBuilder.Entity<Message>()
                .Property(m => m.Content)
                .HasColumnType("text");

            modelBuilder.Entity<User>()
                .Property(u => u.Email)
                .HasMaxLength(255);

            modelBuilder.Entity<User>()
                .Property(u => u.FirstName)
                .HasMaxLength(50);

            modelBuilder.Entity<User>()
                .Property(u => u.LastName)
                .HasMaxLength(50);

            // Patient relationships and constraints
            modelBuilder.Entity<Patient>()
                .HasOne(p => p.User)
                .WithOne()
                .HasForeignKey<Patient>(p => p.UserId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Patient>()
                .HasOne(p => p.PrimaryCareManager)
                .WithMany()
                .HasForeignKey(p => p.PrimaryCareManagerId)
                .OnDelete(DeleteBehavior.SetNull);

            // Patient alert relationships
            modelBuilder.Entity<PatientAlert>()
                .HasOne(pa => pa.Patient)
                .WithMany(p => p.Alerts)
                .HasForeignKey(pa => pa.PatientId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<PatientAlert>()
                .HasOne(pa => pa.AcknowledgedBy)
                .WithMany()
                .HasForeignKey(pa => pa.AcknowledgedById)
                .OnDelete(DeleteBehavior.SetNull);

            // Care task relationships
            modelBuilder.Entity<CareTask>()
                .HasOne(ct => ct.Patient)
                .WithMany(p => p.CareTasks)
                .HasForeignKey(ct => ct.PatientId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<CareTask>()
                .HasOne(ct => ct.AssignedTo)
                .WithMany()
                .HasForeignKey(ct => ct.AssignedToId)
                .OnDelete(DeleteBehavior.SetNull);

            modelBuilder.Entity<CareTask>()
                .HasOne(ct => ct.CreatedBy)
                .WithMany()
                .HasForeignKey(ct => ct.CreatedById)
                .OnDelete(DeleteBehavior.Restrict);

            // Configure field constraints for new entities
            modelBuilder.Entity<Patient>()
                .Property(p => p.PhoneNumber)
                .HasMaxLength(20);

            modelBuilder.Entity<Patient>()
                .Property(p => p.EmergencyContactName)
                .HasMaxLength(100);

            modelBuilder.Entity<Patient>()
                .Property(p => p.Address)
                .HasMaxLength(200);

            modelBuilder.Entity<PatientAlert>()
                .Property(pa => pa.Message)
                .HasMaxLength(500);

            modelBuilder.Entity<CareTask>()
                .Property(ct => ct.Title)
                .HasMaxLength(200);
        }
    }
}
