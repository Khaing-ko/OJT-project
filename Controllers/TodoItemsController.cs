using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TodoApi.Models;
using TodoApi.Repository;

namespace TodoApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TodoItemsController : BaseController<TodoItemsController>
    {
        private readonly IRepositoryWrapper _repositoryWrapper;

        public TodoItemsController(IRepositoryWrapper RW)
        {
            _repositoryWrapper = RW;
        }

        // GET: api/TodoItems
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ItemSearchPayload>>> GetTodoItems()
        {
            var todoItems = await _repositoryWrapper.TodoItem.FindAllAsync();
            return todoItems
                .Select(x => ItemToDTO(x))
                .ToList();
        }

        // GET: api/TodoItems/5
        [HttpGet("{id}")]
        public async Task<ActionResult<TodoItem>> GetTodoItem(long id)
        {
            var item = await _repositoryWrapper.TodoItem.FindByIDAsync(id);
            if (item == null)
            {
                return NotFound();
            }
            return item;
        }

        // PUT: api/TodoItems/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutHero(long id, TodoItem item)
        {
            if (id != item.Id)
            {
                return BadRequest();
            }

            TodoItem? objTodoItem;
            try
            {
                objTodoItem = await _repositoryWrapper.TodoItem.FindByIDAsync(id);
                if (objTodoItem == null)
                    throw new Exception("Invalid TodoItem ID");

                objTodoItem.Name = item.Name;

                await _repositoryWrapper.TodoItem.UpdateAsync(objTodoItem);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ItemExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            return Accepted();
        }

        [HttpPost("searchitems")]
        public async Task<ActionResult<IEnumerable<TodoItem>>> SearchItemMultiple(ItemSearchPayload SearchObj)
        {
            var empList = await _repositoryWrapper.TodoItem.SearchItemMultiple(SearchObj);
            return Ok(empList);
        }

        [HttpPost("search/{term}")]
        public async Task<ActionResult<IEnumerable<TodoItem>>> SearchItem(string term)
        {
            var empList = await _repositoryWrapper.TodoItem.SearchItem(term);
            return Ok(empList);
        }

        // POST: api/TodoItems
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<TodoItem>> PostTodoItem(TodoItem item)
        {
            await _repositoryWrapper.TodoItem.CreateAsync(item, true);
            return CreatedAtAction(nameof(GetTodoItem), new { id = item.Id }, item);
        }

        // DELETE: api/TodoItems/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTodoItem(long id)
        {
            var item = await _repositoryWrapper.TodoItem.FindByIDAsync(id);
            if (item == null)
            {
                return NotFound();
            }
            await _repositoryWrapper.TodoItem.DeleteAsync(item, true);

            return NoContent();
        }


        private bool ItemExists(long id)
        {
            return _repositoryWrapper.TodoItem.IsExists(id);
        }

        private static ItemSearchPayload ItemToDTO(TodoItem todoItem) =>
            new ItemSearchPayload
            {
                Id = todoItem.Id,
                Name = todoItem.Name,
                IsComplete = todoItem.IsComplete
            };
    }
}
