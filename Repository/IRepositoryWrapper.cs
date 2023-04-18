namespace TodoApi.Repository
{
    public interface IRepositoryWrapper
    {
        ITodoItemRepository TodoItem { get; }
        IEmployeeRepository Employee {get;}
        ICustomerRepository Customer { get; }
        IAdminRepository Admin {get;}
        IHeroListRepository HeroList {get;}
        ISupplierRepository Supplier {get;}
        ISupplierTypeRepository SupplierType {get;}
        ICustomerTypeRepository CustomerType { get; }
        IEventLogRepository EventLog { get; }
        IAdminLevelRepository AdminLevel {get;}
        IAdminMenuRepository AdminMenu {get;}
        IOTPRepository OTP { get; }
        
    }
}
