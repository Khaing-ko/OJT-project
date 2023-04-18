using System.ComponentModel.DataAnnotations.Schema;

namespace TodoApi.Models
{
    [Table("tbl_adminmenuurl")]
    public class AdminMenuUrl: BaseModel
    {
        public long AdminMenuID { get; set; }
        public string ServiceUrl { get; set; } = string.Empty;
          
        [ForeignKey("AdminMenuID")]
        public AdminMenu? AdminMenu { get; set; }    
    }
}