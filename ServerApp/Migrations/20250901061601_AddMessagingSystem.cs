using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ServerApp.Migrations
{
    /// <inheritdoc />
    public partial class AddMessagingSystem : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FamilyAccess_Users_FamilyMemberId",
                table: "FamilyAccess");

            migrationBuilder.DropForeignKey(
                name: "FK_FamilyAccess_Users_PatientId",
                table: "FamilyAccess");

            migrationBuilder.DropPrimaryKey(
                name: "PK_FamilyAccess",
                table: "FamilyAccess");

            migrationBuilder.RenameTable(
                name: "FamilyAccess",
                newName: "FamilyAccesses");

            migrationBuilder.RenameColumn(
                name: "CreatedAt",
                table: "Messages",
                newName: "SentAt");

            migrationBuilder.RenameColumn(
                name: "ContentType",
                table: "MessageAttachments",
                newName: "FileType");

            migrationBuilder.RenameIndex(
                name: "IX_FamilyAccess_PatientId",
                table: "FamilyAccesses",
                newName: "IX_FamilyAccesses_PatientId");

            migrationBuilder.RenameIndex(
                name: "IX_FamilyAccess_FamilyMemberId",
                table: "FamilyAccesses",
                newName: "IX_FamilyAccesses_FamilyMemberId");

            migrationBuilder.AlterColumn<string>(
                name: "FilePath",
                table: "MessageAttachments",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AddColumn<byte[]>(
                name: "FileContent",
                table: "MessageAttachments",
                type: "bytea",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_FamilyAccesses",
                table: "FamilyAccesses",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_FamilyAccesses_Users_FamilyMemberId",
                table: "FamilyAccesses",
                column: "FamilyMemberId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_FamilyAccesses_Users_PatientId",
                table: "FamilyAccesses",
                column: "PatientId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_FamilyAccesses_Users_FamilyMemberId",
                table: "FamilyAccesses");

            migrationBuilder.DropForeignKey(
                name: "FK_FamilyAccesses_Users_PatientId",
                table: "FamilyAccesses");

            migrationBuilder.DropPrimaryKey(
                name: "PK_FamilyAccesses",
                table: "FamilyAccesses");

            migrationBuilder.DropColumn(
                name: "FileContent",
                table: "MessageAttachments");

            migrationBuilder.RenameTable(
                name: "FamilyAccesses",
                newName: "FamilyAccess");

            migrationBuilder.RenameColumn(
                name: "SentAt",
                table: "Messages",
                newName: "CreatedAt");

            migrationBuilder.RenameColumn(
                name: "FileType",
                table: "MessageAttachments",
                newName: "ContentType");

            migrationBuilder.RenameIndex(
                name: "IX_FamilyAccesses_PatientId",
                table: "FamilyAccess",
                newName: "IX_FamilyAccess_PatientId");

            migrationBuilder.RenameIndex(
                name: "IX_FamilyAccesses_FamilyMemberId",
                table: "FamilyAccess",
                newName: "IX_FamilyAccess_FamilyMemberId");

            migrationBuilder.AlterColumn<string>(
                name: "FilePath",
                table: "MessageAttachments",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_FamilyAccess",
                table: "FamilyAccess",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_FamilyAccess_Users_FamilyMemberId",
                table: "FamilyAccess",
                column: "FamilyMemberId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_FamilyAccess_Users_PatientId",
                table: "FamilyAccess",
                column: "PatientId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
