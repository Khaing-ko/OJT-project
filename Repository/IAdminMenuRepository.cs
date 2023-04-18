using TodoApi.Models;

namespace TodoApi.Repository
{
    public interface IAdminMenuRepository : IRepositoryBase<AdminMenu>
    {
        Task<IEnumerable<dynamic>> GetAdminMenu(long adminLevelID);
        Task<IEnumerable<dynamic>> GetAdminMenuByAdminLevel(long adminLevelID);

        dynamic GetMenuName(long adminlevelID);
    }
}