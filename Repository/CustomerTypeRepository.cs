using System.Data;
using TodoApi.Models;
using Microsoft.EntityFrameworkCore;
using Kendo.Mvc.Extensions;

namespace TodoApi.Repository
{
    public class CustomerTypeRepository : RepositoryBase<CustomerType>, ICustomerTypeRepository
    {
        public CustomerTypeRepository(DbsContext repositoryContext) : base(repositoryContext) { }

        public async Task<IEnumerable<CustomerType>> ListCustomerType()
        {
            return await RepositoryContext.CustomerTypes
                        .Select(e => new CustomerType
                        {
                            CustomerTypeId = e.CustomerTypeId,
                            CustomerTypeName = e.CustomerTypeName,
                            CustomerTypeDescription = e.CustomerTypeDescription
                        })
                        .OrderBy(s => s.CustomerTypeId).ToListAsync();
        }
    }

}