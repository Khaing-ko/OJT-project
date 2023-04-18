namespace TodoApi.Models
{
    public class CustomerReport : BaseModel
    {
        public long CustomerId { get; set; }

        public string CustomerName { get; set; } = string.Empty;

        public long? CustomerTypeId { get; set; }

        public DateTime RegisterDate { get; set; }

        public string? CustomerTypeName { get; set; }

        public string? CustomerAddress {get; set;}

    }
}