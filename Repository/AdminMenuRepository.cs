using TodoApi.Models;
using Microsoft.EntityFrameworkCore;

namespace TodoApi.Repository
{
    public class AdminMenuRepository : RepositoryBase<AdminMenu>, IAdminMenuRepository
    {
        public AdminMenuRepository(DbsContext repositoryContext)
            : base(repositoryContext)
        {
        }

        public async Task<IEnumerable<dynamic>> GetAdminMenu(long adminLevelID)
        {

            var res1 = await (from main in RepositoryContext.AdminMenus
                              where main.SrNo <= 1000
                              orderby main.ParentID, main.SrNo
                              select new
                              {
                                  main.AdminMenuID,
                                  main.ParentID,
                                  main.SrNo,
                                  main.AdminMenuName,
                                  main.Icon,
                                  main.ControllerName
                              }
                    ).ToListAsync();

            var res2 = await (from detail in RepositoryContext.AdminMenuDetails
                              select new
                              {
                                  detail.AdminMenuID,
                                  ParentID = 0,
                                  SrNo = 10000,
                                  AdminMenuName = "",
                                  Icon = "",
                                  detail.ControllerName
                              }
                    ).ToListAsync();

            return res1.Union(res2)
                    .Select(q => new
                    {
                        AdminLevelId = adminLevelID,
                        MenuID = q.AdminMenuID,
                        q.ParentID,
                        q.SrNo,
                        MenuName = q.AdminMenuName,
                        q.Icon,
                        q.ControllerName,
                        Permission = string.Join(",", (from US in RepositoryContext.AdminMenus
                                                       where US.ParentID == q.AdminMenuID && US.SrNo > 1000
                                                       select US.AdminMenuName).ToList())
                    });
        }

        public async Task<IEnumerable<dynamic>> GetAdminMenuByAdminLevel(long adminLevelID)
        {
            var res1 = await (from ULM in RepositoryContext.AdminLevelMenus
                              join M in RepositoryContext.AdminMenus on ULM.AdminMenuID equals M.AdminMenuID
                              where ULM.AdminLevelId == adminLevelID && M.SrNo <= 1000
                              orderby M.ParentID, M.SrNo
                              select new
                              {
                                  M.AdminMenuID,
                                  M.ParentID,
                                  M.SrNo,
                                  M.AdminMenuName,
                                  M.Icon,
                                  M.ControllerName
                              }
                    ).ToListAsync();

            var res2 = await (from ULM in RepositoryContext.AdminLevelMenus
                              join detail in RepositoryContext.AdminMenuDetails on ULM.AdminMenuID equals detail.AdminMenuID
                              where ULM.AdminLevelId == adminLevelID
                              select new
                              {
                                  detail.AdminMenuID,
                                  ParentID = 0,
                                  SrNo = 10000,
                                  AdminMenuName = "",
                                  Icon = "",
                                  detail.ControllerName
                              }
                    ).ToListAsync();

            return res1.Union(res2)
                    .Select(q => new
                    {
                        AdminLevelId = adminLevelID,
                        MenuID = q.AdminMenuID,
                        q.ParentID,
                        q.SrNo,
                        MenuName = q.AdminMenuName,
                        q.Icon,
                        q.ControllerName,
                        Permission = string.Join(",", (from UU in RepositoryContext.AdminLevelMenus
                                                       join US in RepositoryContext.AdminMenus on UU.AdminMenuID equals US.AdminMenuID
                                                       where US.ParentID == q.AdminMenuID && UU.AdminLevelId == adminLevelID && US.SrNo > 1000
                                                       select US.AdminMenuName).ToList())
                    });
        }

        public dynamic GetMenuName(long adminlevelID)
        {
            var query = (from ULM in RepositoryContext.AdminLevelMenus
                         join M in RepositoryContext.AdminMenus on ULM.AdminMenuID equals M.AdminMenuID
                         where ULM.AdminLevelId == adminlevelID && M.SrNo <= 1000
                         orderby M.ParentID, M.SrNo
                         select new
                         {
                             M.AdminMenuID,
                             M.ParentID,
                             M.SrNo,
                             M.AdminMenuName,
                             M.Icon,
                             M.ControllerName
                         }).ToList();
            return query;
        }
    }
}