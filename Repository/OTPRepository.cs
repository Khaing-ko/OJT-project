using TodoApi.Models;

namespace TodoApi.Repository
{
    public class OTPRepository : RepositoryBase<OTP>, IOTPRepository
    {
        public OTPRepository(DbsContext repositoryContext) : base(repositoryContext)
        {
        }

    }
}
