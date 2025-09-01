using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using ServerApp.Data.DTOs;
using ServerApp.Data.Models;
using ServerApp.Repositories;

namespace ServerApp.Controllers
{
    /// <summary>
    /// Handles todo item operations including CRUD functionality
    /// Restricted to users with Administrator role (UserGroupId = 1)
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = nameof(UserGroupEnum.ADMINISTRATOR))] // Only administrators can access todos
    public class TodoController : ControllerBase
    {
        // Repository for todo data operations
        private readonly ITodoRepository _repo;

        /// <summary>
        /// Initializes a new instance of the TodoController
        /// </summary>
        /// <param name="repo">Todo repository for data operations</param>
        public TodoController(ITodoRepository repo)
        {
            // Inject todo repository dependency
            _repo = repo;
        }

        /// <summary>
        /// Retrieves all todo items from the database
        /// </summary>
        /// <returns>List of all todo items</returns>
        [HttpGet]
        public async Task<ActionResult<List<Todo>>> GetTodos()
        {
            // Fetch all todos from repository
            var todos = await _repo.GetTodos();
            // Return todos as JSON response
            return todos;
        }

        /// <summary>
        /// Creates a new todo item
        /// </summary>
        /// <param name="todo">Todo data transfer object containing the name</param>
        /// <returns>HTTP 200 OK on successful creation</returns>
        [HttpPost]
        public async Task<ActionResult> PostTodo(TodoDto todo)
        {
            // Create new todo entity from DTO
            var newTodo = new Todo
            {
                // Set todo name from DTO
                Name = todo.Name
            };
            // Save todo to repository
            await _repo.AddTodo(newTodo);
            // Return success response
            return Ok();
        }

        /// <summary>
        /// Deletes a todo item by its ID
        /// </summary>
        /// <param name="id">The ID of the todo item to delete</param>
        /// <returns>HTTP 204 No Content on successful deletion</returns>
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTodo(int id)
        {
            // Remove todo from repository by ID
            await _repo.DeleteTodo(id);

            // Return no content status
            return NoContent();
        }
    }
}
