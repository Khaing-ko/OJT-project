using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TodoApi.Models;
using TodoApi.Repository;

namespace TodoApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : BaseController<EmployeesController>
    {
        private readonly IRepositoryWrapper _repositoryWrapper;

        public EmployeesController(IRepositoryWrapper RW)
        {
            _repositoryWrapper = RW;
        }

        // GET: api/TodoItems
        [HttpGet]
        public async Task<ActionResult<IEnumerable<EmployeeResult>>> GetEmp()
        {
            var Emps = await _repositoryWrapper.Employee.ListEmployee();
            return Ok(Emps);
        }

        // GET: api/TodoItems/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Employee>> GetEmp(long id)
        {
            var emp = await _repositoryWrapper.Employee.FindByIDAsync(id);
            if (emp == null)
            {
                return NotFound();
            }
            return emp;
        }

        // PUT: api/TodoItems/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEmp(long id, Employee item)
        {
            if (id != item.Id)
            {
                return BadRequest();
            }

            Employee? objEmployee;
            try
            {
                objEmployee = await _repositoryWrapper.Employee.FindByIDAsync(id);
                if (objEmployee == null)
                    throw new Exception("Invalid Employee ID");

                objEmployee.EmployeeName = item.EmployeeName;

                await _repositoryWrapper.Employee.UpdateAsync(objEmployee);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EmpExists(id))
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
        public async Task<ActionResult<IEnumerable<Employee>>> SearchEmployee(string term)
        {
            var empList = await _repositoryWrapper.Employee.SearchEmployee(term);
            return Ok(empList);
        }

        // POST: api/TodoItems
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Employee>> PostEmp(Employee item)
        {
            await _repositoryWrapper.Employee.CreateAsync(item, true);
            return CreatedAtAction(nameof(GetEmp), new { id = item.Id }, item);
        }

        // DELETE: api/TodoItems/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmployee(long id)
        {
            var item = await _repositoryWrapper.Employee.FindByIDAsync(id);
            if (item == null)
            {
                return NotFound();
            }
            await _repositoryWrapper.Employee.DeleteAsync(item, true);

            return NoContent();
        }


        private bool EmpExists(long id)
        {
            return _repositoryWrapper.TodoItem.IsExists(id);
        }

        private static EmployeeRequest ItemToDTO(Employee emps) =>
            new EmployeeRequest
            {
                Id = emps.Id,
                EmployeeName = emps.EmployeeName,
                EmployeeAddress = emps.EmployeeAddress
            };

    }
}
