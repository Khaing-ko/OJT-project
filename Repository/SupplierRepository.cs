using System.Data;
using TodoApi.Models;
using Microsoft.EntityFrameworkCore;
using Kendo.Mvc.UI;
using Kendo.Mvc.Extensions;

namespace TodoApi.Repository
{
    public class SupplierRepository : RepositoryBase<Supplier>, ISupplierRepository
    {
        public SupplierRepository(DbsContext repositoryContext) : base(repositoryContext) { }

        public async Task<IEnumerable<SupplierResult>> SearchSupplier(string searchTerm)
        {
            return await RepositoryContext.Suppliers
                        .Where(s => s.SupplierName.Contains(searchTerm))
                        .Select(e => new SupplierResult
                        {
                            SupplierId = e.SupplierId,
                            SupplierName = e.SupplierName,
                            SupplierAddress = e.SupplierAddress,
                            SupplierTypeId = e.SupplierTypeId,
                            SupplierTypeName = e.SupplierType!.SupplierTypeName,
                            SupplierTypeDescription = e.SupplierType.SupplierTypeDescription,
                            SupplierPhoto = e.SupplierPhoto
                        })
                        .OrderBy(s => s.SupplierId).ToListAsync();
        }

        public async Task<IEnumerable<SupplierResult>> ListSupplier()
        {
            return await RepositoryContext.Suppliers
                        .Select(e => new SupplierResult
                        {
                            SupplierId = e.SupplierId,
                            SupplierName = e.SupplierName,
                            SupplierAddress = e.SupplierAddress,
                            SupplierTypeId = e.SupplierTypeId,
                            SupplierTypeName = e.SupplierType!.SupplierTypeName,
                            SupplierTypeDescription = e.SupplierType.SupplierTypeDescription,
                            SupplierPhoto = e.SupplierPhoto
                        })
                        .OrderBy(s => s.SupplierId).ToListAsync();
        }

        public async Task<DataSourceResult> GetCustomerInfoGrid(DataSourceRequest request)
        {
            var mainQuery = (from main in RepositoryContext.Suppliers
                             join ct in RepositoryContext.SupplierTypes on main.SupplierTypeId equals ct.SupplierTypeId
                             select new
                             {
                                 main.SupplierId,
                                 main.SupplierName,
                                 main.SupplierAddress,
                                 ct.SupplierTypeName,
                                 main.SupplierTypeId,
                                 main.RegisterDate
                             });
            return await mainQuery.ToDataSourceResultAsync(request);
        }


        public bool IsExists(long id)
        {
            return RepositoryContext.Customers.Any(e => e.CustomerId == id);
        }
    }

}
