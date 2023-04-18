namespace TodoApi.Models
{
    public class HeroList : BaseModel
    {
        public long Id { get; set; }
        public string? Name { get; set; }
        public int Age { get; set; }
        public string? Address { get; set; }
    }
}