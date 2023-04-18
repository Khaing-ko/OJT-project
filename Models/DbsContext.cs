using Dapper;
using Kendo.Mvc.UI;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.EntityFrameworkCore;
using MySqlConnector;
using System.Dynamic;

namespace TodoApi.Models
{
    public class DbsContext : DbContext
    {
        private static readonly IConfiguration _configuration = Startup.StaticConfiguration!;
        private readonly string _connectionString = _configuration.GetSection("ConnectionStrings:DefaultConnection").Get<string>();
        public readonly IHttpContextAccessor _httpContextAccessor;
        public readonly IActionContextAccessor _actionContextAccessor;

        public DbsContext(DbContextOptions<DbsContext> options,
            IHttpContextAccessor httpContextAccessor,
            IActionContextAccessor actionContextAccessor)
            : base(options)
        {
            _httpContextAccessor = httpContextAccessor;
            _actionContextAccessor = actionContextAccessor;
        }

        public DbSet<TodoItem> TodoItems { get; set; } = null!;
        public DbSet<HeroList> HeroLists { get; set; } = null!;

        public DbSet<Employee> Employees { get; set; } = null!;

        public DbSet<Department> Departments { get; set; } = null!;
        public DbSet<Customer> Customers { get; set; } = null!;

        public DbSet<CustomerType> CustomerTypes { get; set; } = null!;

        public DbSet<Admin> Admins { get; set; } = null!;
        public DbSet<AdminLevel> AdminLevels { get; set; } = null!;

        public DbSet<Supplier> Suppliers { get; set; } = null!;
        public DbSet<SupplierType> SupplierTypes { get; set; } = null!;
        public DbSet<EventLog> EventLogs { get; set; } = null!;
        public DbSet<AdminMenu> AdminMenus { get; set; } = null!;
        public DbSet<AdminLevelMenu> AdminLevelMenus { get; set; } = null!;
        public DbSet<AdminMenuDetails> AdminMenuDetails { get; set; } = null!;
        public DbSet<AdminMenuUrl> AdminMenuUrls { get; set; } = null!;
        public DbSet<OTP>OTPs{get;set;}= null!;


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<AdminMenuUrl>()
                .HasKey(c => new { c.AdminMenuID, c.ServiceUrl });

            modelBuilder.Entity<AdminLevelMenu>()
                .HasKey(c => new { c.AdminLevelId, c.AdminMenuID });

            modelBuilder.Entity<AdminMenuDetails>()
                .HasKey(c => new { c.AdminMenuID, c.ControllerName });
        }

        public async Task<int> RunExecuteNonQuery(string Query, ExpandoObject queryFilter)
        {
            if (queryFilter == null)
            {
                queryFilter = new ExpandoObject();
            }

            using (MySqlConnection conn = new(_connectionString))
            {
                var result = await conn.ExecuteAsync(Query, queryFilter);

                return result;
            }
        }

        public async Task<dynamic> RunExecuteSelectQuery(string Query, ExpandoObject? queryFilter = null)
        {
            if (queryFilter == null)
            {
                queryFilter = new ExpandoObject();
            }

            using (var conn = new MySqlConnection(_connectionString))
            {
                var result = await conn.QueryAsync(Query, queryFilter);
                return result;
            }
        }

        public async Task<List<T>> RunExecuteSelectQuery<T>(string Query, ExpandoObject? queryFilter = null)
        {
            if (queryFilter == null)
            {
                queryFilter = new ExpandoObject();
            }

            using (var conn = new MySqlConnection(_connectionString))
            {
                var result = await conn.QueryAsync<T>(Query, queryFilter);
                return result.ToList();
            }
        }

        public async Task<dynamic> RunExecuteSelectQuery(string selectClause, string whereClause, dynamic objGridState, ExpandoObject queryParams)
        {
            int pageIndex = Convert.ToInt32(objGridState.gridState.page);
            int pageSize = Convert.ToInt32(objGridState.gridState.pageSize);
            int startRow = (pageIndex - 1) * pageSize;
            string sortClause = "";
            if (queryParams == null)
            {
                queryParams = new ExpandoObject();
            }
            queryParams.TryAdd("startRow", startRow);
            queryParams.TryAdd("pageSize", pageSize);

            if (objGridState.gridState.sort != null)
            {
                string sort = objGridState.gridState.sort;
                if (sort.Split("-").Length == 2)
                {
                    string sortfield = sort.Split("-")[0];
                    string sortdirection = "ASC ";
                    if (sort.Split("-")[1] == "desc")
                        sortdirection = "DESC ";
                    if (selectClause.IndexOf(sortfield) > 0)  //to void sql injection, validate sort column name in select clause
                    {
                        sortClause = " ORDER BY " + sortfield + " " + sortdirection;
                    }
                }
            }

            string Query = selectClause + " " + whereClause + " " + sortClause + " limit @startRow, @pageSize;";

            using (var conn = new MySqlConnection(_connectionString))
            {
                //var result = conn.Query(Query, queryParams);
                var result = await conn.QueryAsync(Query, queryParams);

                string CountQuery = "SELECT count(*) as TotalRecord " + whereClause;
                var rowcount = await conn.QueryFirstAsync<int>(CountQuery, queryParams);
                return new DataSourceResult
                {
                    Total = rowcount,
                    Data = result
                };
            }
        }

        public async Task<DataSourceResult> RunExecuteSelectQuery<T>(string selectClause, string whereClause, dynamic objGridState, ExpandoObject queryParams)
        {
            int pageIndex = Convert.ToInt32(objGridState.gridState.page);
            int pageSize = Convert.ToInt32(objGridState.gridState.pageSize);
            int startRow = (pageIndex - 1) * pageSize;
            string sortClause = "";
            if (queryParams == null)
            {
                queryParams = new ExpandoObject();
            }
            queryParams.TryAdd("startRow", startRow);
            queryParams.TryAdd("pageSize", pageSize);

            if (objGridState.gridState.sort != null)
            {
                string sort = objGridState.gridState.sort;
                if (sort.Split("-").Length == 2)
                {
                    string sortfield = sort.Split("-")[0];
                    string sortdirection = "ASC ";
                    if (sort.Split("-")[1] == "desc")
                        sortdirection = "DESC ";
                    if (selectClause.IndexOf(sortfield) > 0)  //to void sql injection, validate sort column name in select clause
                    {
                        sortClause = " ORDER BY " + sortfield + " " + sortdirection;
                    }
                }
            }

            string Query = selectClause + " " + whereClause + " " + sortClause + " limit @startRow, @pageSize;";

            using (var conn = new MySqlConnection(_connectionString))
            {
                //var result = conn.Query(Query, queryParams);
                var result = await conn.QueryAsync<T>(Query, queryParams);

                string CountQuery = "SELECT count(*) as TotalRecord " + whereClause;
                var rowcount = await conn.QueryFirstAsync<int>(CountQuery, queryParams);
                return new DataSourceResult
                {
                    Total = rowcount,
                    Data = result
                };
            }
        }
    }
}