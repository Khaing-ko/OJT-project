using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TodoApi.Models;
using TodoApi.Util;
using TodoApi.Repository;
using Kendo.Mvc.UI;

namespace TodoApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SuppliersController : BaseController<SuppliersController>
    {
        private readonly IRepositoryWrapper _repositoryWrapper;

        public SuppliersController(IRepositoryWrapper RW)
        {
            _repositoryWrapper = RW;
        }

        // GET: api/Suppliers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SupplierResult>>> GetSupplier()
        {
            var Cus = await _repositoryWrapper.Supplier.ListSupplier();
            return Ok(Cus);
        }

        [HttpPost("showlist")]
        public async Task<JsonResult> PostSupplierGrid([DataSourceRequest] DataSourceRequest request)
        {
            Task.Delay(3000).Wait();
            var dsmainQuery = new JsonResult(await _repositoryWrapper.Supplier.GetCustomerInfoGrid(request));
            // await _repositoryWrapper.EventLog.Info("View Customer showlist");
            return dsmainQuery;
        }

        // GET: api/Suppliers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Supplier>> GetSupplier(long id)
        {
            var cus = await _repositoryWrapper.Supplier!.FindByIDAsync(id);
            if (cus == null)
            {
                return NotFound();
            }
            return cus;
        }

        // PUT: api/Suppliers/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSupplier(long id, Supplier item)
        {
            if (id != item.SupplierId)
            {
                return BadRequest();
            }

            Supplier? objSupplier;
            try
            {
                objSupplier = await _repositoryWrapper.Supplier.FindByIDAsync(id);
                if (objSupplier == null)
                    throw new Exception("Invalid Supplier ID");

                if (item.SupplierPhoto != objSupplier.SupplierPhoto)
                {
                    if (item.SupplierPhoto != null && item.SupplierPhoto != "")
                    {
                        FileService.DeleteFileNameOnly("SupplierPhoto", id.ToString());
                        FileService.MoveTempFile("SupplierPhoto", item.SupplierId.ToString(), item.SupplierPhoto!);
                    }
                }
                objSupplier.SupplierName = item.SupplierName;
                objSupplier.RegisterDate = item.RegisterDate;
                objSupplier.SupplierAddress = item.SupplierAddress;
                objSupplier.SupplierTypeId = item.SupplierTypeId;
                objSupplier.SupplierPhoto = item.SupplierPhoto;

                await _repositoryWrapper.Supplier.UpdateAsync(objSupplier);
            }

            catch (DbUpdateConcurrencyException)
            {
                if (!SupExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            return Accepted();
        }


        [HttpPost("search/{term}")]
        public async Task<ActionResult<IEnumerable<SupplierResult>>> SearchSupplier(string term)
        {
            var cusList = await _repositoryWrapper.Supplier.SearchSupplier(term);
            return Ok(cusList);
        }

        // POST: api/Suppliers
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Supplier>> PostSupplier(Supplier item)
        {
            try
            {
                var supplier = new Supplier
                {
                    SupplierName = item.SupplierName,
                    RegisterDate = DateTime.Now,
                    SupplierAddress = item.SupplierAddress,
                    SupplierTypeId = item.SupplierTypeId,
                    SupplierPhoto = item.SupplierPhoto,
                };


                if (item.SupplierPhoto != null && item.SupplierPhoto != "")
                {
                    FileService.MoveTempFile("SupplierPhoto", item.SupplierId.ToString(), item.SupplierPhoto);
                    // FileService.MoveTempFileDir("SupplierPhoto", item.SupplierId.ToString(), item.SupplierPhoto);
                }

                await _repositoryWrapper.Supplier.CreateAsync(supplier, true);

                return CreatedAtAction(nameof(GetSupplier), new { id = supplier.SupplierId }, supplier);
            }
            catch (DbUpdateConcurrencyException)
            {
                throw;
            }
        }


        // DELETE: api/Suppliers/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSupplier(long id)
        {
            var item = await _repositoryWrapper.Supplier.FindByIDAsync(id);
            if (item == null)
            {
                return NotFound();
            }
            FileService.DeleteFileNameOnly("SupplierPhoto", id.ToString());
            await _repositoryWrapper.Supplier.DeleteAsync(item, true);

            return NoContent();
        }


        private bool SupExists(long id)
        {
            return _repositoryWrapper.Supplier.IsExists(id);
        }
    }
}
