using Microsoft.AspNetCore.Mvc;
using TodoApi.Models;
using TodoApi.Repository;

namespace TodoApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SupplierTypesController : BaseController<SupplierTypesController>
    {
        private readonly IRepositoryWrapper _repositoryWrapper;

        public SupplierTypesController(IRepositoryWrapper RW)
        {
            _repositoryWrapper = RW;
        }

        // GET: api/Suppliers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SupplierTypeResult>>> GetSupplierType()
        {
            var Cus = await _repositoryWrapper.SupplierType.ListSupplierType();
            return Ok(Cus);
        }

    }
}
