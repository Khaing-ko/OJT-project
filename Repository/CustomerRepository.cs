using System.Data;
using TodoApi.Models;
using Microsoft.EntityFrameworkCore;
using Kendo.Mvc.Extensions;
using Kendo.Mvc.UI;
using System.Dynamic;
using TodoApi.Util;
using Kendo.Mvc;

namespace TodoApi.Repository
{
    public class CustomerRepository : RepositoryBase<Customer>, ICustomerRepository
    {
        public CustomerRepository(DbsContext repositoryContext) : base(repositoryContext) { }

        public async Task<IEnumerable<CustomerResult>> SearchCustomer(string searchTerm)
        {
            return await RepositoryContext.Customers
                        .Where(s => s.CustomerName.Contains(searchTerm))
                        .Select(e => new CustomerResult
                        {
                            CustomerId = e.CustomerId,
                            CustomerName = e.CustomerName,
                            CustomerAddress = e.CustomerAddress,
                            CustomerTypeId = e.CustomerTypeId,
                            CustomerTypeName = e.CustomerType!.CustomerTypeName,
                            CustomerTypeDescription = e.CustomerType.CustomerTypeDescription,
                            CustomerPhoto = e.CustomerPhoto
                        })
                        .OrderBy(s => s.CustomerId).ToListAsync();
        }

        public async Task<DataSourceResult> GetCustomerInfoGrid(DataSourceRequest request)
        {
            var mainQuery = (from main in RepositoryContext.Customers
                                join ct in RepositoryContext.CustomerTypes on main.CustomerTypeId equals ct.CustomerTypeId
                             select new
                             {
                                main.CustomerId,
                                main.CustomerName,
                                main.CustomerAddress, 
                                ct.CustomerTypeName,
                                main.CustomerTypeId,
                                main.RegisterDate
                             });
            return await mainQuery.ToDataSourceResultAsync(request);
        }

        public async Task<IEnumerable<CustomerResult>> ListCustomer()
        {
            // return await RepositoryContext.Customers
            //             .OrderBy(s => s.Id).ToListAsync();
            // return await RepositoryContext.Customers
            //             .Include(e => e.EmpDepartment)
            //             .OrderBy(s => s.Id).ToListAsync();
            // return await RepositoryContext.Customers
            //             .Select(e => new CustomerResult{
            //                 Id = e.Id,
            //                 CustomerName = e.CustomerName,
            //                 CustomerAddress = e.CustomerAddress,
            //                 EmpDepartmentId = e.EmpDepartmentId
            //             })
            //             .OrderBy(s => s.Id).ToListAsync();
            return await RepositoryContext.Customers
                        .Select(e => new CustomerResult
                        {
                            CustomerId = e.CustomerId,
                            CustomerName = e.CustomerName,
                            CustomerAddress = e.CustomerAddress,
                            CustomerTypeId = e.CustomerTypeId,
                            CustomerTypeName = e.CustomerType!.CustomerTypeName,
                            CustomerTypeDescription = e.CustomerType.CustomerTypeDescription,
                            CustomerPhoto = e.CustomerPhoto
                        })
                        .OrderBy(s => s.CustomerId).ToListAsync();
        }


        public bool IsExists(long id)
        {
            return RepositoryContext.Customers.Any(e => e.CustomerId == id);
        }

        public async Task<DataSourceResult> GetCustomerReport(dynamic param)
        {
            string WhereQuery = " WHERE 1=1 ";
            ExpandoObject queryFilter = new();
            DataSourceRequest request = KendoDataSourceRequestUtil.Parse(param);
            dynamic paramData = param.data;  //External data for additional filter

            string GridQuery = KendoDataSourceRequestUtil.FiltersToParameterizedQuery(request.Filters, FilterCompositionLogicalOperator.And, queryFilter);
            if(GridQuery != "")
                WhereQuery += " AND " + GridQuery;

            //append external filter into where query
            if (paramData.CustomerName.ToString() != "")
            {
                string custname = paramData.CustomerName.Value;
                queryFilter.TryAdd("@CustomerName", "%"+custname+"%");
                WhereQuery += " AND customer_name LIKE @CustomerName";
            }
            if (paramData.FromDate.ToString() != "")
            {
                DateTime fromDate = paramData.FromDate + " 00:00:00";
                queryFilter.TryAdd("@FromDate", fromDate);
                WhereQuery += " AND customer_register_date >= @FromDate";
            }
            if (paramData.ToDate.ToString() != "")
            {
                DateTime toDate = paramData.ToDate + " 23:59:59";
                queryFilter.TryAdd("@ToDate", toDate);
                WhereQuery += " AND customer_register_date <= @ToDate";
            }
            if (paramData.CustomerTypeId.ToString() != "")
            {
                long custtypeid = paramData.CustomerTypeId.Value;
                queryFilter.TryAdd("@CustomerTypeId", custtypeid);
                WhereQuery += " AND c.customer_type_id = @CustomerTypeId";
            }

            var SelectQuery = "SELECT customer_id as CustomerId, customer_name as CustomerName, customer_address as CustomerAddress, ct.customer_type_name as CustomerTypeName, customer_register_date as RegisterDate ";
            var FilterQuery = "FROM tbl_customer c " +
                                " INNER JOIN tbl_customer_type ct ON c.customer_type_id = ct.customer_type_id " + WhereQuery;
            return await RepositoryContext.RunExecuteSelectQuery<CustomerReport>(SelectQuery, FilterQuery, param, queryFilter);
        }
    }

}