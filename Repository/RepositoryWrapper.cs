using TodoApi.Models;
namespace TodoApi.Repository
{
    public class RepositoryWrapper : IRepositoryWrapper
    {
        private readonly DbsContext _repoContext;

        public RepositoryWrapper(DbsContext repositoryContext)
        {
            _repoContext = repositoryContext;
        }

        private ITodoItemRepository? oItem;
        public ITodoItemRepository TodoItem
        {
            get
            {
                if (oItem == null)
                {
                    oItem = new TodoItemRepository(_repoContext);
                }

                return oItem;
            }
        }
        private IEmployeeRepository? oEmp;
        public IEmployeeRepository Employee
        {
            get
            {
                if (oEmp == null)
                {
                    oEmp = new EmployeeRepository(_repoContext);
                }

                return oEmp;
            }
        }

        private ICustomerRepository? oCus;
        public ICustomerRepository Customer
        {
            get
            {
                if (oCus == null)
                {
                    oCus = new CustomerRepository(_repoContext);
                }

                return oCus;
            }
        }

        private IAdminRepository? oAdmin;
        public IAdminRepository Admin
        {
            get
            {
                if (oAdmin == null)
                {
                    oAdmin = new AdminRepository(_repoContext);
                }
                return oAdmin;
            }
        }

        private IHeroListRepository? oHero;
        public IHeroListRepository HeroList
        {
            get
            {
                if (oHero == null)
                {
                    oHero = new HeroListRepository(_repoContext);
                }

                return oHero;
            }
        }

        private ISupplierRepository? oSupplier;
        public ISupplierRepository Supplier
        {
            get
            {
                if (oSupplier == null)
                {
                    oSupplier = new SupplierRepository(_repoContext);
                }

                return oSupplier;
            }
        }

        private ISupplierTypeRepository? oSupplierType;
        public ISupplierTypeRepository SupplierType
        {
            get
            {
                if (oSupplierType == null)
                {
                    oSupplierType = new SupplierTypeRepository(_repoContext);
                }

                return oSupplierType;
            }
        }

        private ICustomerTypeRepository? oCustomerType;
        public ICustomerTypeRepository CustomerType
        {
            get
            {
                if (oCustomerType == null)
                {
                    oCustomerType = new CustomerTypeRepository(_repoContext);
                }

                return oCustomerType;
            }
        }

        private IEventLogRepository? oEventLog;
        public IEventLogRepository EventLog
        {
            get
            {
                if (oEventLog == null)
                {
                    oEventLog = new EventLogRepository(_repoContext);
                }
                return oEventLog;
            }
        }

        private IAdminMenuRepository? oAdminMenu;
        public IAdminMenuRepository AdminMenu
        {
            get
            {
                if (oAdminMenu == null)
                {
                    oAdminMenu = new AdminMenuRepository(_repoContext);
                }
                return oAdminMenu;
            }
        }

        private IAdminLevelRepository? oAdminLevel;
        public IAdminLevelRepository AdminLevel
        {
            get
            {
                if (oAdminLevel == null)
                {
                    oAdminLevel = new AdminLevelRepository(_repoContext);
                }
                return oAdminLevel;
            }
        }

        private IOTPRepository? oOTP;
        public IOTPRepository OTP
        {
            get
            {
                if (oOTP == null)
                {
                    oOTP = new OTPRepository(_repoContext);
                }
                return oOTP;
            }
        }
    }
}