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
    public class CustomersController : BaseController<CustomersController>
    {
        private readonly IRepositoryWrapper _repositoryWrapper;

        public CustomersController(IRepositoryWrapper RW)
        {
            _repositoryWrapper = RW;
        }

        [HttpPost("showlist")]
        public async Task<JsonResult> PostCustomerGrid([DataSourceRequest] DataSourceRequest request)
        {
            var dsmainQuery = new JsonResult(await _repositoryWrapper.Customer.GetCustomerInfoGrid(request));
            // await _repositoryWrapper.EventLog.Info("View Customer showlist");
            return dsmainQuery;
        }

        // GET: api/Customers
        [HttpGet("GetCustomers")]
        public async Task<ActionResult<IEnumerable<CustomerResult>>> GetCus()
        {
            var Cus = await _repositoryWrapper.Customer.ListCustomer();
            return Ok(Cus);
        }

        // GET: api/Customers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Customer>> GetCus(long id)
        {
            var cus = await _repositoryWrapper.Customer!.FindByIDAsync(id);
            if (cus == null)
            {
                return NotFound();
            }
            return cus;
        }

        // PUT: api/Customers/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCus(long id, Customer item)
        {
            if (id != item.CustomerId)
            {
                return BadRequest();
            }

            Customer? objCustomer;
            try
            {
                objCustomer = await _repositoryWrapper.Customer.FindByIDAsync(id);
                if (objCustomer == null)
                    throw new Exception("Invalid Customer ID");



                //string photoName = item.CustomerId.ToString() + FileService.GetFileExtension(item.CustomerPhoto!);

                if (item.CustomerPhoto != objCustomer.CustomerPhoto)
                {
                    if (item.CustomerPhoto != null && item.CustomerPhoto != "")
                    {
                        // FileService.DeleteFileNameOnly("CustomerPhoto", id.ToString());
                        // FileService.MoveTempFile("CustomerPhoto", item.CustomerId.ToString(), item.CustomerPhoto!);
                        // objCustomer.CustomerPhoto = item.CustomerPhoto;
                        FileService.MoveTempFileDir("CustomerPhoto", item.CustomerId.ToString(), item.CustomerPhoto!);
                    }
                    

                }
                objCustomer.CustomerName = item.CustomerName;
                objCustomer.RegisterDate = item.RegisterDate;
                objCustomer.CustomerAddress = item.CustomerAddress;
                objCustomer.CustomerTypeId = item.CustomerTypeId;
                

                await _repositoryWrapper.Customer.UpdateAsync(objCustomer);

            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CusExists(id))
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
        public async Task<ActionResult<IEnumerable<CustomerResult>>> SearchCustomer(string term)
        {
            var cusList = await _repositoryWrapper.Customer.SearchCustomer(term);
            return Ok(cusList);
        }

        // POST: api/Customers
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Customer>> PostCus(Customer item)
        {
            var customer = new Customer
            {
                CustomerName = item.CustomerName,
                RegisterDate = DateTime.Now,
                CustomerAddress = item.CustomerAddress,
                CustomerTypeId = item.CustomerTypeId,
                CustomerPhoto = item.CustomerPhoto,
            };

            await _repositoryWrapper.Customer.CreateAsync(customer, true);

            CreatedAtAction(
            nameof(GetCus),
            new { id = customer.CustomerId },
            customer);

            if (item.CustomerPhoto != null && item.CustomerPhoto != "")
            {
                // FileService.MoveTempFile("CustomerPhoto", customer.CustomerId.ToString(), item.CustomerPhoto);
                FileService.MoveTempFileDir("CustomerPhoto", customer.CustomerId.ToString(), item.CustomerPhoto);
            }

            return Ok();


        }

        [HttpPost("report")]
        public async Task<dynamic> PostCustomerReport(Newtonsoft.Json.Linq.JObject param)
        {
            // await _repositoryWrapper.EventLog.Info("View Customer Report");
            return await _repositoryWrapper.Customer.GetCustomerReport(param);
        }


        // DELETE: api/Customers/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCustomer(long id)
        {
            var item = await _repositoryWrapper.Customer.FindByIDAsync(id);
            if (item == null)
            {
                return NotFound();
            }
            FileService.DeleteFileNameOnly("CustomerPhoto", id.ToString());
            await _repositoryWrapper.Customer.DeleteAsync(item, true);

            return NoContent();
        }


        private bool CusExists(long id)
        {
            return _repositoryWrapper.Customer.IsExists(id);
        }
    }
}
