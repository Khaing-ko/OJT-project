using TodoApi.Models;

namespace TodoApi.Repository
{
    public interface IEmployeeRepository : IRepositoryBase<Employee>
    {
        Task<IEnumerable<Employee>> SearchEmployee(string searchTerm);
        Task<IEnumerable<EmployeeResult>> ListEmployee();
        bool IsExists(long id);
    }
}