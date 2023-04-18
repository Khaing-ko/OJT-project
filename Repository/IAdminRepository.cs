using Kendo.Mvc.UI;
using TodoApi.Models;

namespace TodoApi.Repository
{
    public interface IAdminRepository : IRepositoryBase<Admin>
    {
        Task<IEnumerable<AdminResult>> SearchAdmin(string searchTerm);
        Task<IEnumerable<AdminResult>> ListAdmin();
        Task<IEnumerable<dynamic>> GetAdminLoginValidation(string username);
        bool IsExists(long id);
        Task<DataSourceResult> GetAdminInfoGrid(DataSourceRequest request);
    }
}