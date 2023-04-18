using System.ComponentModel.DataAnnotations.Schema;

namespace TodoApi.Models
{
    [System.ComponentModel.DataAnnotations.Schema.Table("tbl_adminmenudetails")]
    public class AdminMenuDetails   : BaseModel
    {
        public long AdminMenuID { get; set; }
        public string? ControllerName { get; set; } 

        [ForeignKey("AdminMenuID")]
        public AdminMenu? AdminMenu { get; set; }           
    }
}