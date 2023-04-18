using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TodoApi.Models
{
    [Table("tbl_admin_level")]
    public class AdminLevel : BaseModel
    {
        [Key]
        public long AdminLevelId { get; set; }
        public string? AdminLevelName { get; set; }

        public string? RestrictIPList { get; set; }
        public string? Description { get; set; }
        public string? Remark { get; set; }
        public Boolean IsAdministrator { get; set; }
        public DateTime? CreateDate { get; set; }
        public DateTime? ModifiedDate { get; set; }
    }
}