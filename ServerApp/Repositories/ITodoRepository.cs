using ServerApp.Data.Models;

namespace ServerApp.Repositories
{
    /// <summary>
    /// Interface for todo repository operations
    /// Defines contracts for CRUD operations on todo items
    /// </summary>
    public interface ITodoRepository
    {
        /// <summary>
        /// Retrieves all todo items from the database
        /// </summary>
        /// <returns>List of all todo items</returns>
        Task<List<Todo>> GetTodos();
        
        /// <summary>
        /// Adds a new todo item to the database
        /// </summary>
        /// <param name="todo">Todo entity to add</param>
        /// <returns>The added todo entity</returns>
        Task<Todo> AddTodo(Todo todo);
        
        /// <summary>
        /// Deletes a todo item by its ID
        /// </summary>
        /// <param name="id">ID of the todo item to delete</param>
        Task DeleteTodo(int id);
    }
}
