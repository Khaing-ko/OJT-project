namespace TodoApi.Models
{
    public class SupplierResult : BaseModel
    {
        public long SupplierId { get; set; }
        public string SupplierName { get; set; } = string.Empty;
        public string SupplierAddress { get; set; } = string.Empty;
        public long? SupplierTypeId { get; set; }
        public string? SupplierTypeName { get; set; }
        public string? SupplierTypeDescription { get; set; }
        public string? SupplierPhoto {get; set;}
    }
}