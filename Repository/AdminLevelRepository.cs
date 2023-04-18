using TodoApi.Models;
using Microsoft.EntityFrameworkCore;
using Serilog;
using System.Text.RegularExpressions;

namespace TodoApi.Repository
{
    public class AdminLevelRepository: RepositoryBase<AdminLevel>, IAdminLevelRepository
    {
        public AdminLevelRepository(DbsContext repositoryContext):base(repositoryContext)
        {
        }

        public async Task<IEnumerable<AdminLevelMenu>> GetAdminLevelMenuBylID(long AdminLevelId) {
           return await (from adl in RepositoryContext.AdminLevelMenus
                     where adl.AdminLevelId == AdminLevelId
                     select adl).ToListAsync();
        }

        public async Task<dynamic> GetAdminMenu(int chk) {
            var res = await (from main in RepositoryContext.AdminMenus
                    orderby main.SrNo
                    select main).ToListAsync();

            return res.Select(q => new
                {
                    ID = q.AdminMenuID,
                    Name = q.AdminMenuName,
                    ParentID = q.ParentID,
                    Checked = chk
                });
        }

        public async Task<bool> CheckDuplicateAdminLevel(long AdminLevelId, string AdminLevel) 
        {
            return await RepositoryContext.AdminLevels.AnyAsync(e => e.AdminLevelId != AdminLevelId && e.AdminLevelName == AdminLevel);
        } 

        public async Task<bool> CheckAdminLevelAccessURL(long AdminLevelId, string ServiceUrl)
        {
            ServiceUrl = ServiceUrl.TrimEnd('/');  //if end with /, truncate it
            var checkResult = await (from levelmenu in RepositoryContext.AdminLevelMenus
                            join menuurl in RepositoryContext.AdminMenuUrls on levelmenu.AdminMenuID equals menuurl.AdminMenuID
                            where levelmenu.AdminLevelId == AdminLevelId && 
                                Regex.IsMatch(ServiceUrl, "^(?i)/api/" + menuurl.ServiceUrl + "$")   //case insensitive matching and prefix must be /api/
                            select levelmenu.AdminMenuID).AnyAsync();
            return checkResult;
        }

        public async Task<bool> DeleteAdminLevelMenu(long AdminLevelId)
        {
            try {
                var AdminLevelMenu = await (from alm in RepositoryContext.AdminLevelMenus
                                                where alm.AdminLevelId == AdminLevelId
                                                select alm).ToListAsync();
                RepositoryContext.AdminLevelMenus.RemoveRange(AdminLevelMenu);
                Save();
                return true;
            }
            catch(Exception ex) {
                Log.Error(ex, "DeleteAdminLevelMenu Fail");
                return false;
            }
            
        }

        public async Task<bool> AddAdminLevelMenu(List<AdminLevelMenu> newlist)
        {
            try {
                await RepositoryContext.AdminLevelMenus.AddRangeAsync(newlist);
                Save();
                return true;
            }
            catch(Exception ex) {
                Log.Error(ex, "AddAdminLevelMenu Fail");
                return false;
            }
        }

        public async Task<IEnumerable<AdminLevel>> ListAdminLevel()
        {
            return await RepositoryContext.AdminLevels
                        .Select(e => new AdminLevel
                        {
                            AdminLevelId = e.AdminLevelId,
                            AdminLevelName = e.AdminLevelName,
                        })
                        .OrderBy(s => s.AdminLevelId).ToListAsync();
        }
      
    }
}