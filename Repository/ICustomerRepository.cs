using TodoApi.Models;
using Kendo.Mvc.UI;

namespace TodoApi.Repository
{
    public interface ICustomerRepository : IRepositoryBase<Customer>
    {
        Task<IEnumerable<CustomerResult>> SearchCustomer(string searchTerm);

        Task<DataSourceResult> GetCustomerInfoGrid(DataSourceRequest request);
        Task<IEnumerable<CustomerResult>> ListCustomer();
        bool IsExists(long id);

        Task<DataSourceResult> GetCustomerReport(dynamic param);
    }
}