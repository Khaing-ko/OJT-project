using System.ComponentModel.DataAnnotations.Schema;

namespace TodoApi.Models
{
    [Table("tbl_adminlevelmenu")]
    public class AdminLevelMenu: BaseModel
    {
        public long AdminLevelId { get; set; }
        public long AdminMenuID { get; set; }
        
        [ForeignKey("AdminLevelId")]
        public AdminLevel? AdminLevel { get; set; }               
    }
}