using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TodoApi.Models
{
    [Table("tbl_supplier")]
    public class Supplier : BaseModel
    {
        [Column("supplier_id")]
        [Key]
        public long SupplierId { get; set; }

        [Required]
        [Column("supplier_name")]
        [StringLength(50)]
        public string SupplierName { get; set; } = string.Empty;

        [Column("supplier_register_date")]
        public DateTime RegisterDate { get; set; }

        [Column("supplier_address")]
        [StringLength(100)]
        public string SupplierAddress { get; set; } = string.Empty;

        [Column("supplier_photo")]
        [StringLength(300)]
        public string? SupplierPhoto { get; set; }

        [Column("supplier_type_id")]
        public long? SupplierTypeId { get; set; }


        [ForeignKey("SupplierTypeId")]
        public SupplierType? SupplierType { get; set; }

    }
}