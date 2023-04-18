using System.Data;
using TodoApi.Models;
using Microsoft.EntityFrameworkCore;

namespace TodoApi.Repository
{
    public class SupplierTypeRepository : RepositoryBase<SupplierType>, ISupplierTypeRepository
    {
        public SupplierTypeRepository(DbsContext repositoryContext) : base(repositoryContext) { }


        public async Task<IEnumerable<SupplierTypeResult>> ListSupplierType()
        {
            return await RepositoryContext.SupplierTypes
                        .Select(e => new SupplierTypeResult
                        {
                            SupplierTypeId = e.SupplierTypeId,
                            SupplierTypeName = e.SupplierTypeName,
                            SupplierTypeDescription = e.SupplierTypeDescription
                        })
                        .OrderBy(s => s.SupplierTypeId).ToListAsync();
        }
    }

}