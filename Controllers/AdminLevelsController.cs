using Microsoft.AspNetCore.Mvc;
using TodoApi.Models;
using TodoApi.Repository;


namespace TodoApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminLevelsController : BaseController<AdminLevelsController>
    {
        private readonly IRepositoryWrapper _repositoryWrapper;

        public AdminLevelsController(IRepositoryWrapper RW)
        {
            _repositoryWrapper = RW;
        }

        // GET: api/Customers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AdminLevel>>> GetAdminLevel()
        {
            var Cus = await _repositoryWrapper.AdminLevel.ListAdminLevel();
            return Ok(Cus);
        }

    }
}
