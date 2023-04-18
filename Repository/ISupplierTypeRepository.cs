using TodoApi.Models;

namespace TodoApi.Repository
{
    public interface ISupplierTypeRepository : IRepositoryBase<SupplierType>
    {
        Task<IEnumerable<SupplierTypeResult>> ListSupplierType();
    }
}