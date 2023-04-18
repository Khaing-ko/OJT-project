namespace TodoApi.Models
{
    public class AdminResult : BaseModel
    {
        public long AdminId { get; set; }

        public string? AdminName { get; set; }

        public string? AdminEmail { get; set; }

        public string? AdminLoginName { get; set; }

        public string? adminPassword { get; set; }

        public Boolean AdminStatus { get; set; }

        public string? AdminPhoto { get; set; }

        public long AdminLevelId { get; set; }

        public string? AdminLevelName {get; set;}

    }
}