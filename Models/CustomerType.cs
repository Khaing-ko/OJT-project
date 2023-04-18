using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TodoApi.Models
{
    [Table("tbl_customer_type")]
    public partial class CustomerType : BaseModel
    {
        [Column("customer_type_id")]
        [Key]
        public long CustomerTypeId { get; set; }

        [MaxLength(50)]
        [Required]
        [Column("customer_type_name")]
        public string CustomerTypeName { get; set; } = string.Empty;

        [MaxLength(200)]
        [Column("customer_type_description")]   
        public string CustomerTypeDescription { get; set; } = string.Empty;

    }
}