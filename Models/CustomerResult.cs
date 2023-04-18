namespace TodoApi.Models
{
    public class CustomerResult : BaseModel
    {
        public long CustomerId { get; set; }
        public string CustomerName { get; set; } = string.Empty;
        public string CustomerAddress { get; set; } = string.Empty;
        public long? CustomerTypeId { get; set; }
        public string? CustomerTypeName { get; set; }
        public string? CustomerTypeDescription { get; set; }

        public string? CustomerPhoto {get; set;}
    }
}