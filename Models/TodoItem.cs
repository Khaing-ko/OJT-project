using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TodoApi.Models
{
    [Table("tbl_todo_items")]
    public class TodoItem : BaseModel
    {
        [Column("todo_id")]
        [Required]
        public long Id { get; set; }

        [Column("todo_name")]
        [StringLength(50)]
        public string Name { get; set; } = "";

        [Column("todo_status")]
        public bool IsComplete { get; set; }
    }
}
