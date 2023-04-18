using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TodoApi.Models
{
    [Table("tbl_supplier_type")]
    public class SupplierType : BaseModel
    {
        [Column("supplier_type_id")]
        [Key]
        public long SupplierTypeId { get; set; }

        [MaxLength(50)]
        [Required]
        [Column("supplier_type_name")]
        public string SupplierTypeName { get; set; } = string.Empty;

        [MaxLength(200)]
        [Column("supplier_type_description")]   
        public string SupplierTypeDescription { get; set; } = string.Empty;

    }
}