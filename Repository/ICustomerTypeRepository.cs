using TodoApi.Models;

namespace TodoApi.Repository
{
    public interface ICustomerTypeRepository : IRepositoryBase<CustomerType>
    {
        Task<IEnumerable<CustomerType>> ListCustomerType();
    }
}