using Microsoft.AspNetCore.Mvc;
using TodoApi.Repository;

namespace TodoApi.Controllers
{

    [Route("api/[controller]")]

    public class MenuController : BaseController<MenuController>
    {
        private readonly IRepositoryWrapper _repositoryWrapper;
        public MenuController(IRepositoryWrapper RW)
        {
            _repositoryWrapper = RW;
        }

        
        [HttpGet("GetAdminLevelMenuData", Name = "GetAdminLevelMenuData")]
        public async Task<dynamic> GetAdminLevelMenuData()  //do not NEVER get userid or userlevel id from client side, they must retrieve from token.
        {
            long AdminLevelID = Convert.ToInt64(GetTokenData("UserLevelID"));

            dynamic objresponse;
            if (await CheckIsAdministrator(AdminLevelID))
            {
                objresponse =await _repositoryWrapper.AdminMenu.GetAdminMenu(AdminLevelID);
            }
            else
            {
                  objresponse = await _repositoryWrapper.AdminMenu.GetAdminMenuByAdminLevel(AdminLevelID);
            }
            dynamic objresponsedata = new { data = objresponse };
            return objresponsedata;
        }

        private async Task<bool> CheckIsAdministrator(long AdminLevelID)
        {
           var objAdminlevel = await _repositoryWrapper.AdminLevel.FindByIDAsync(AdminLevelID);
            if (objAdminlevel != null)
            {
                if (objAdminlevel.IsAdministrator)
                    return true;
                else
                    return false;
            }
            else
            {
                return false;
            }
        }
    }
}