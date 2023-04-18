namespace TodoApi.Models
{
    public class SupplierTypeResult : BaseModel
    {
        public long? SupplierTypeId { get; set; }
        public string? SupplierTypeName { get; set; }
        public string? SupplierTypeDescription { get; set; }
    }
}