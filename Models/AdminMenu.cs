using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TodoApi.Models
{
     [Table("tbl_adminmenu")]
    public class AdminMenu: BaseModel
    {
        [Key]
        public long AdminMenuID { get; set; }
        public string AdminMenuName { get; set; } = string.Empty;
        public string? ControllerName { get; set; }
        public string? Icon { get; set; }
        public int ParentID { get; set; }
        public int SrNo { get; set; }

    }
}