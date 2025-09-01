using System.Text.Json;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ServerApp.Data
{
    public static class SeedDataHelper
    {
        /// <summary>
        /// Generic method to seed data from JSON file for any table
        /// </summary>
        /// <typeparam name="T">The entity type to seed</typeparam>
        /// <param name="migrationBuilder">The migration builder</param>
        /// <param name="tableName">The name of the table in the database</param>
        /// <param name="jsonSectionName">The section name in the JSON file (e.g., "UserGroups", "Todos")</param>
        /// <param name="jsonFilePath">Optional custom path to JSON file, defaults to "Data/SeedData.json"</param>
        public static void SeedFromJson<T>(
            MigrationBuilder migrationBuilder, 
            string tableName, 
            string jsonSectionName, 
            string jsonFilePath = "Data/SeedData.json") where T : class
        {
            try
            {
                // Read the JSON file
                var jsonContent = File.ReadAllText(jsonFilePath);
                var seedData = JsonSerializer.Deserialize<Dictionary<string, JsonElement>>(jsonContent);
                
                if (seedData != null && seedData.ContainsKey(jsonSectionName))
                {
                    var items = JsonSerializer.Deserialize<List<T>>(seedData[jsonSectionName].GetRawText());
                    
                    if (items != null && items.Any())
                    {
                        // Get the properties of the entity
                        var properties = typeof(T).GetProperties()
                            .Where(p => p.CanWrite && p.PropertyType.IsValueType || p.PropertyType == typeof(string))
                            .ToArray();
                        
                        var columns = properties.Select(p => p.Name).ToArray();
                        
                        // Insert each item individually
                        foreach (var item in items)
                        {
                            var values = properties.Select(prop => prop.GetValue(item)).ToArray();
                            
                            migrationBuilder.InsertData(
                                table: tableName,
                                columns: columns,
                                values: values
                            );
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                // Log or handle the exception as needed
                Console.WriteLine($"Error seeding data for {tableName}: {ex.Message}");
                throw;
            }
        }
        
        /// <summary>
        /// Remove seeded data from a table
        /// </summary>
        /// <typeparam name="T">The entity type</typeparam>
        /// <param name="migrationBuilder">The migration builder</param>
        /// <param name="tableName">The name of the table</param>
        /// <param name="keyColumn">The primary key column name (usually "Id")</param>
        /// <param name="jsonSectionName">The section name in the JSON file</param>
        /// <param name="jsonFilePath">Optional custom path to JSON file</param>
        public static void RemoveSeedData<T>(
            MigrationBuilder migrationBuilder, 
            string tableName, 
            string keyColumn, 
            string jsonSectionName, 
            string jsonFilePath = "Data/SeedData.json") where T : class
        {
            try
            {
                var jsonContent = File.ReadAllText(jsonFilePath);
                var seedData = JsonSerializer.Deserialize<Dictionary<string, JsonElement>>(jsonContent);
                
                if (seedData != null && seedData.ContainsKey(jsonSectionName))
                {
                    var items = JsonSerializer.Deserialize<List<T>>(seedData[jsonSectionName].GetRawText());
                    
                    if (items != null && items.Any())
                    {
                        var keyProperty = typeof(T).GetProperty(keyColumn);
                        if (keyProperty != null)
                        {
                            var keyValues = items.Select(item => keyProperty.GetValue(item))
                                                 .Where(value => value != null)
                                                 .ToArray();
                            
                            if (keyValues.Any())
                            {
                                migrationBuilder.DeleteData(
                                    table: tableName,
                                    keyColumn: keyColumn,
                                    keyValues: keyValues!
                                );
                            }
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error removing seed data for {tableName}: {ex.Message}");
                throw;
            }
        }
    }
}

//  How to seed data

// SeedDataHelper.SeedFromJson<UserGroup>(
//     migrationBuilder, 
//     "UserGroups", 
//     "UserGroups"
// );

// SeedDataHelper.RemoveSeedData<Todo>(
//     migrationBuilder,
//     "UserGroups",
//     "Id",
//     "UserGroups"
// );