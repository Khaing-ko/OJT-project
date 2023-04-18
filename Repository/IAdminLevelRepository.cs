using TodoApi.Models;

namespace TodoApi.Repository
{
    public interface IAdminLevelRepository : IRepositoryBase<AdminLevel>
    {
        Task<IEnumerable<AdminLevelMenu>> GetAdminLevelMenuBylID(long AdminLevelID);
        Task<dynamic> GetAdminMenu(int chk) ;
        Task<bool> CheckDuplicateAdminLevel(long AdminLevelID, string AdminLevel) ;
        Task<bool> DeleteAdminLevelMenu(long AdminLevelID);
        Task<bool> AddAdminLevelMenu(List<AdminLevelMenu> newlist);
        Task<bool> CheckAdminLevelAccessURL(long AdminLevelId, string ServiceUrl);
        Task<IEnumerable<AdminLevel>> ListAdminLevel();
    }
}