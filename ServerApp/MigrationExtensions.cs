using Microsoft.EntityFrameworkCore;
using ServerApp.Data;

namespace ServerApp;

public static class MigrationExtensions
{
    public static void ApplyMigrations(this IApplicationBuilder app)
    {
        using IServiceScope scope = app.ApplicationServices.CreateScope();
        using DatabaseContext context = scope.ServiceProvider.GetRequiredService<DatabaseContext>();

        if (context.Database.GetPendingMigrations().Any())
        {
            context.Database.Migrate();
        }
        else
        {
            context.Database.EnsureCreated();
        }
    }
}
