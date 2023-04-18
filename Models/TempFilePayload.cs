namespace TodoApi.Models
{
    public class TempFilePayload : BaseModel
    {
        public string? TempDir { get; set; }
        public string? TempFile { get; set; }
    }
}