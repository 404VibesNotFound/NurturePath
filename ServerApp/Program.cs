using Microsoft.EntityFrameworkCore;
using ServerApp.Data;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using ServerApp.Repositories;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.Filters;
using ServerApp;

// Create application builder with provided arguments
var builder = WebApplication.CreateBuilder(args);
// Define CORS policy name for frontend integration
var corsPolicy = "AllowedOrigins";

/// <summary>
/// Configure application services and dependencies
/// </summary>

// Add services to the container.
// Configure CORS for Angular frontend communication
builder.Services.AddCors(options =>
{
    // Define CORS policy for allowed origins
    options.AddPolicy(corsPolicy,
        b =>
        {
            // Allow specific origin
            b.WithOrigins(
                    "http://localhost:5173/",
                    "https://nuturepath-26112d8101f3.herokuapp.com/"
                )
                // Allow any HTTP headers
                .AllowAnyHeader()
                // Allow any HTTP methods (GET, POST, etc.)
                .AllowAnyMethod()
                // Allow credentials for authentication
                .AllowCredentials();
        });
});

// Configure Entity Framework with PostgreSQL database
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
var secret = builder.Configuration.GetSection("AppSettings:Secret").Value;

if (!builder.Environment.IsDevelopment())
{
    connectionString = Environment.GetEnvironmentVariable("CONNECTIONSTRING_SUPABASE");
    secret = Environment.GetEnvironmentVariable("APPSETTINGS_SECRET");
}

builder.Services.AddDbContext<DatabaseContext>(
    x => x.UseNpgsql(connectionString));

// Register dependency injection services
builder.Services.AddScoped<IAuthRepository, AuthRepository>(); // Authentication repository
builder.Services.AddScoped<ITodoRepository, TodoRepository>(); // Todo repository

// Add MVC controllers support
builder.Services.AddControllers();
// Add API explorer for Swagger documentation
builder.Services.AddEndpointsApiExplorer();
// Configure Swagger/OpenAPI documentation with JWT authentication
builder.Services.AddSwaggerGen(options =>
{
    // Add JWT bearer authentication to Swagger UI
    options.AddSecurityDefinition("oauth2", new OpenApiSecurityScheme
    {
        // JWT token is passed in Authorization header
        In = ParameterLocation.Header,
        // Header name for authorization
        Name = "Authorization",
        // Use API key type for JWT bearer tokens
        Type = SecuritySchemeType.ApiKey
    });
    // Apply security requirements to all endpoints
    options.OperationFilter<SecurityRequirementsOperationFilter>();
});

if (secret != null)
{
    // Convert secret to byte array for token validation
    var key = Encoding.ASCII.GetBytes(secret);
    // Configure JWT bearer authentication
    builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options => {
        // Set token validation parameters
        options.TokenValidationParameters = new TokenValidationParameters
        {
            // Validate the signing key
            ValidateIssuerSigningKey = true,
            // Set the signing key for validation
            IssuerSigningKey = new SymmetricSecurityKey(key),
            // Skip issuer validation for development
            ValidateIssuer = false,
            // Skip audience validation for development
            ValidateAudience = false
        };
    });
}

// Build the application with configured services
var app = builder.Build();

/// <summary>
/// Configure HTTP request pipeline and middleware
/// </summary>

// Enable Swagger UI in development environment
if (app.Environment.IsDevelopment())
{
    // Apply any pending database migrations automatically
    app.ApplyMigrations();
}

// Enable Swagger JSON endpoint
app.UseSwagger();

// Enable Swagger UI for API testing
app.UseSwaggerUI();

// Redirect HTTP requests to HTTPS
app.UseHttpsRedirection();

// Enable CORS with configured policy
app.UseCors(corsPolicy);

// Enable JWT authentication middleware
app.UseAuthentication();

// Enable authorization middleware for role-based access
app.UseAuthorization();

// Map controller endpoints to routes
app.MapControllers();

// Start the application and listen for requests
app.Run();
