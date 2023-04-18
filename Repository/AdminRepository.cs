using System.Data;
using TodoApi.Models;
using Microsoft.EntityFrameworkCore;
using Kendo.Mvc.UI;
using Kendo.Mvc.Extensions;

namespace TodoApi.Repository
{
    public class AdminRepository : RepositoryBase<Admin>, IAdminRepository
    {
        public AdminRepository(DbsContext repositoryContext) : base(repositoryContext) { }

        public async Task<IEnumerable<AdminResult>> SearchAdmin(string searchTerm)
        {
            return await RepositoryContext.Admins
                        .Where(s => s.AdminName!.Contains(searchTerm))
                        .Select(e => new AdminResult
                        {
                            AdminId = e.AdminId,
                            AdminName = e.AdminName,
                            AdminEmail = e.AdminEmail,
                            AdminLoginName = e.AdminLoginName,
                            adminPassword = e.adminPassword,
                            AdminStatus = e.AdminStatus,
                            AdminPhoto = e.AdminPhoto,
                            AdminLevelId = e.AdminLevel!.AdminLevelId,
                            AdminLevelName = e.AdminLevel.AdminLevelName
                        })
                        .OrderBy(s => s.AdminId).ToListAsync();
        }

        public async Task<IEnumerable<AdminResult>> ListAdmin()
        {
            return await RepositoryContext.Admins
                        .Select(e => new AdminResult
                        {
                            AdminId = e.AdminId,
                            AdminName = e.AdminName,
                            AdminEmail = e.AdminEmail,
                            AdminLoginName = e.AdminLoginName,
                            adminPassword = e.adminPassword,
                            AdminStatus = e.AdminStatus,
                            AdminPhoto = e.AdminPhoto,
                            AdminLevelId = e.AdminLevel!.AdminLevelId,
                            AdminLevelName = e.AdminLevel.AdminLevelName
                        })
                        .OrderBy(s => s.AdminId).ToListAsync();
        }


        public async Task<IEnumerable<dynamic>> GetAdminLoginValidation(string username)
        {
            return await (from usr in RepositoryContext.Admins
                          join ul in RepositoryContext.AdminLevels on usr.AdminLevelId equals ul.AdminLevelId into tmp
                          from c in tmp
                          where usr.AdminLoginName == (string)username
                          select new
                          {
                              usr.adminPassword,
                              usr.Salt,
                              usr.AdminId,
                              usr.AdminName,
                              usr.AdminLevelId,
                              usr.AdminEmail,
                              usr.AdminLoginName,
                              c.AdminLevelName,
                              usr.AdminStatus,
                          }).ToListAsync();
        }


        public bool IsExists(long id)
        {
            return RepositoryContext.Admins.Any(e => e.AdminId == id);
        }

        public async Task<DataSourceResult> GetAdminInfoGrid(DataSourceRequest request)
        {
            var mainQuery = (from main in RepositoryContext.Admins
                                join al in RepositoryContext.AdminLevels on main.AdminLevelId equals al.AdminLevelId
                             select new
                             {
                                main.AdminId,
                                main.AdminName,
                                main.AdminEmail, 
                                al.AdminLevelName,
                                main.AdminLevelId
                             });
            return await mainQuery.ToDataSourceResultAsync(request);
        }
    }

}