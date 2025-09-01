namespace ServerApp.Data.Models;

public enum UserGroupEnum
{
    ADMINISTRATOR,
    NORMAL_USER
    // Add more roles as needed
}

public class UserGroup
{
    public int Id { get; set; }
    public string? GroupName { get; set; }

    public List<User>? Users { get; set; } // Navigation property to users in this group
}