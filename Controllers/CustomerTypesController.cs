using Microsoft.AspNetCore.Mvc;
using TodoApi.Models;
using TodoApi.Repository;


namespace TodoApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerTypesController : BaseController<CustomerTypesController>
    {
        private readonly IRepositoryWrapper _repositoryWrapper;

        public CustomerTypesController(IRepositoryWrapper RW)
        {
            _repositoryWrapper = RW;
        }

        // GET: api/Customers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CustomerType>>> GetCustomerType()
        {
            var Cus = await _repositoryWrapper.CustomerType.ListCustomerType();
            return Ok(Cus);
        }

    }
}
