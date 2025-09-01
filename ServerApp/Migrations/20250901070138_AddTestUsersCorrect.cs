using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ServerApp.Migrations
{
    /// <inheritdoc />
    public partial class AddTestUsersCorrect : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // Add test users for messaging functionality
            migrationBuilder.Sql(@"
                INSERT INTO ""Users"" (""FirstName"", ""LastName"", ""Email"", ""PasswordHash"", ""PasswordSalt"", ""Role"", ""IsActive"", ""CreatedAt"", ""UpdatedAt"")
                VALUES 
                    ('Dr. Sarah', 'Johnson', 'dr.johnson@healthcare.com', decode('deadbeef', 'hex'), decode('cafebabe', 'hex'), 2, true, NOW(), NOW()),
                    ('Mary', 'Smith', 'mary.smith@family.com', decode('deadbeef', 'hex'), decode('cafebabe', 'hex'), 3, true, NOW(), NOW())
                ON CONFLICT (""Email"") DO NOTHING;
            ");

            // Create relationships to allow messaging (assuming the test user exists)
            migrationBuilder.Sql(@"
                INSERT INTO ""PatientProviderRelationships"" (""PatientId"", ""ProviderId"", ""RelationshipType"", ""IsActive"", ""StartDate"", ""CreatedAt"")
                SELECT u.""Id"", (SELECT ""Id"" FROM ""Users"" WHERE ""Email"" = 'dr.johnson@healthcare.com'), 1, true, NOW(), NOW()
                FROM ""Users"" u 
                WHERE u.""Email"" = 'test@test.com' AND u.""Role"" = 1;
            ");

            migrationBuilder.Sql(@"
                INSERT INTO ""FamilyAccesses"" (""PatientId"", ""FamilyMemberId"", ""AccessLevel"", ""CanViewMessages"", ""CanViewAppointments"", ""ConsentGivenAt"", ""IsActive"", ""CreatedAt"")
                SELECT u.""Id"", (SELECT ""Id"" FROM ""Users"" WHERE ""Email"" = 'mary.smith@family.com'), 2, true, true, NOW(), true, NOW()
                FROM ""Users"" u 
                WHERE u.""Email"" = 'test@test.com' AND u.""Role"" = 1;
            ");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            // Remove test data
            migrationBuilder.Sql(@"
                DELETE FROM ""FamilyAccesses"" WHERE ""FamilyMemberId"" IN (SELECT ""Id"" FROM ""Users"" WHERE ""Email"" IN ('dr.johnson@healthcare.com', 'mary.smith@family.com'));
                DELETE FROM ""PatientProviderRelationships"" WHERE ""ProviderId"" IN (SELECT ""Id"" FROM ""Users"" WHERE ""Email"" IN ('dr.johnson@healthcare.com', 'mary.smith@family.com'));
                DELETE FROM ""Users"" WHERE ""Email"" IN ('dr.johnson@healthcare.com', 'mary.smith@family.com');
            ");
        }
    }
}
