using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TodoApi.Models
{
    [Table("tbl_admin")]
    public class Admin : BaseModel
    {
        [Column("admin_id")]
        [Key]
        public long AdminId {get; set;}


        [Column("admin_name")]
        public string? AdminName {get; set;}

        [Column("admin_email")]
        public string? AdminEmail {get; set;}

        [Column("admin_login_name")]
        public string? AdminLoginName {get; set;}

        [Column("admin_password")]
        public string? adminPassword {get; set;}
        [Required]
        [Column("salt")]
        public string? Salt { get; set; }


        [Column("admin_status")]
        public Boolean AdminStatus {get; set;}

        [Column("admin_photo")]
        public string? AdminPhoto { get; set; }

        [Column("AdminLevelId")]
        public long AdminLevelId {get; set;}

        [ForeignKey("AdminLevelId")]
        public AdminLevel? AdminLevel { get; set; }
    }
}