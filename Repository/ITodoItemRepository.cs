using TodoApi.Models;

namespace TodoApi.Repository
{
    public interface ITodoItemRepository : IRepositoryBase<TodoItem>
    {
        Task<IEnumerable<TodoItem>> SearchItem(string searchName);
        Task<IEnumerable<TodoItem>> SearchItemMultiple(ItemSearchPayload SearchObj);
        bool IsExists(long id);
    }
}