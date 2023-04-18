namespace TodoApi.Models
{
    public class HeroSearchPayLoad : BaseModel
    {
        public long Id { get; set; }
        public string? Name { get; set; }
        public int Age { get; set; }
    }
}