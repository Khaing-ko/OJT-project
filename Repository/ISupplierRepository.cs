using Kendo.Mvc.UI;
using TodoApi.Models;

namespace TodoApi.Repository
{
    public interface ISupplierRepository : IRepositoryBase<Supplier>
    {
        Task<IEnumerable<SupplierResult>> SearchSupplier(string searchTerm);
        Task<IEnumerable<SupplierResult>> ListSupplier();
        Task<DataSourceResult> GetCustomerInfoGrid(DataSourceRequest request);
        bool IsExists(long id);
    }
}