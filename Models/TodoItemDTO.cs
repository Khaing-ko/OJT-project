using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TodoApi.Models
{
    [Table("TodoItems")]
    public class TodoItemDTO : BaseModel
    {
        [Column("todo_id")]
        public long Id {get;set;}

        [Column("todo_name")]
        [Required]
        [StringLength(50)]
        public string Name {get;set;} = "";

        [Column("todo_status")]
        public bool IsComplete {get;set;}
    }
}
