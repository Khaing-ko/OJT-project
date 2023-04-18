using System.Data;
using TodoApi.Models;
using Microsoft.EntityFrameworkCore;

namespace TodoApi.Repository
{
    public class TodoItemRepository : RepositoryBase<TodoItem>, ITodoItemRepository
    {
        public TodoItemRepository(DbsContext repositoryContext) : base(repositoryContext) { }

        public async Task<IEnumerable<TodoItem>> SearchItem(string searchTerm)
        {
            return await RepositoryContext.TodoItems
                        .Where(s => s.Name.Contains(searchTerm))
                        .OrderBy(s => s.Id).ToListAsync();
        }


        public async Task<IEnumerable<TodoItem>> SearchItemMultiple(ItemSearchPayload SearchObj)
        {
            return await RepositoryContext.TodoItems
                        .Where(s => s.Name.Contains(SearchObj.Name ?? ""))
                        .OrderBy(s => s.Id).ToListAsync();
        }

        public bool IsExists(long id)
        {
            return RepositoryContext.TodoItems.Any(e => e.Id == id);
        }
    }

}