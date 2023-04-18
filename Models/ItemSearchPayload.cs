namespace TodoApi.Models
{
    public class ItemSearchPayload : BaseModel
    {
        public long Id {get; set;}
        public string? Name {get; set;}
        public bool IsComplete {get; set;}
    }
}