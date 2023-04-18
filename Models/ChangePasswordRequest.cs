namespace TodoApi.Models
{
    public class ChangePasswordRequest : BaseModel
    {
        public string CurrentPassword { get; set; }
        public string NewPassword { get; set; }
        public string ConfirmNewPassword { get; set; }
    }
}

