using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TodoApi.Models
{
    [Table("tbl_department")]
    public partial class Department  : BaseModel
    {
        [Column("dept_id")]
        [Key]
        public int Id { get; set; }
        
        [MaxLength(100)]
        [Required]
        [Column("dept_name")]
        public string DeptName { get; set; } = string.Empty;
    }
}