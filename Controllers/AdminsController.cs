using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TodoApi.Models;
using TodoApi.Util;
using TodoApi.Repository;
using Kendo.Mvc.UI;
using System.Security.Claims;
using Microsoft.AspNetCore.Mvc.Filters;

namespace TodoApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminsController : BaseController<AdminsController>
    {
        private readonly IRepositoryWrapper _repositoryWrapper;
        private ActionExecutingContext? _actionExecutionContext;

        private static readonly IConfiguration _configuration = Startup.StaticConfiguration!;
        string password = _configuration["appSettings:password"];

        public override void OnActionExecuting(ActionExecutingContext context)
        {

            _actionExecutionContext = context;
        }

        public AdminsController(IRepositoryWrapper RW)
        {
            _repositoryWrapper = RW;
        }

        // GET: api/Admins
        [HttpGet("GetAdminList")]
        public async Task<ActionResult<IEnumerable<AdminResult>>> GetAdm()
        {
            var Cus = await _repositoryWrapper.Admin.ListAdmin();
            return Ok(Cus);
        }

        [HttpPost("showlist")]
        public async Task<JsonResult> PostAdminGrid([DataSourceRequest] DataSourceRequest request)
        {
            var dsmainQuery = new JsonResult(await _repositoryWrapper.Admin.GetAdminInfoGrid(request));
            // await _repositoryWrapper.EventLog.Info("View Admin showlist");
            return dsmainQuery;
        }

        // GET: api/Admins/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Admin>> GetAdm(long id)
        {
            var cus = await _repositoryWrapper.Admin!.FindByIDAsync(id);
            if (cus == null)
            {
                return NotFound();
            }
            return cus;
        }

        // PUT: api/Admins/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("UpdateAdminSetup/{id}")]
        public async Task<IActionResult> PutCus(long id, Admin item)
        {
            if (id != item.AdminId)
            {
                return BadRequest();
            }

            Admin? objAdmin;
            try
            {
                objAdmin = await _repositoryWrapper.Admin.FindByIDAsync(id);
                if (objAdmin == null)
                    throw new Exception("Invalid Admin ID");

                if (item.AdminPhoto != objAdmin.AdminPhoto)
                {
                    if (item.AdminPhoto != null && item.AdminPhoto != "")
                    {
                        // FileService.DeleteFileNameOnly("AdminPhoto", id.ToString());
                        // FileService.MoveTempFile("AdminPhoto", item.AdminId.ToString(), item.AdminPhoto!);
                        // objAdmin.AdminPhoto = item.AdminPhoto;
                        FileService.MoveTempFileDir("AdminPhoto", item.AdminId.ToString(), item.AdminPhoto!);
                    }

                }
                objAdmin.AdminName = item.AdminName;
                objAdmin.AdminEmail = item.AdminEmail;
                objAdmin.AdminLoginName = item.AdminLoginName;
                objAdmin.adminPassword = item.adminPassword;
                objAdmin.AdminStatus = item.AdminStatus;
                objAdmin.AdminLevelId = item.AdminLevelId;

                await _repositoryWrapper.Admin.UpdateAsync(objAdmin);
                await _repositoryWrapper.EventLog.Update(objAdmin);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CusExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            return Accepted();
        }


        [HttpPost("search/{term}")]
        public async Task<ActionResult<IEnumerable<AdminResult>>> SearchCustomer(string term)
        {
            var cusList = await _repositoryWrapper.Admin.SearchAdmin(term);
            return Ok(cusList);
        }

        [HttpPut("ResetAdminPassword/{id}")]
        public async Task<IActionResult> ResetAdminPassword(long id, [FromBody] string newPassword)
        {
            var admin = await _repositoryWrapper.Admin.FindByIDAsync(id);
            if (admin == null)
            {
                return NotFound();
            }
            newPassword = password;

            string salt = Util.SaltedHash.GenerateSalt();
            string hashedPassword = Util.SaltedHash.ComputeHash(salt, newPassword);
            admin.adminPassword = hashedPassword;
            admin.Salt = salt;

            await _repositoryWrapper.Admin.UpdateAsync(admin);
            return Ok();
        }


        // POST: api/Admins
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost("AddAdminSetup")]
        public async Task<ActionResult<Admin>> PostAdmin(Admin item)
        {
            var admin = new Admin
            {
                AdminName = item.AdminName,
                AdminEmail = item.AdminEmail,
                AdminLoginName = item.AdminLoginName,
                AdminStatus = item.AdminStatus,
                AdminLevelId = item.AdminLevelId,
                AdminPhoto = item.AdminPhoto,
            };

            string password = item.adminPassword!;
            string salt = Util.SaltedHash.GenerateSalt();
            password = Util.SaltedHash.ComputeHash(salt, password.ToString());
            admin.adminPassword = password;
            admin.Salt = salt;

            await _repositoryWrapper.Admin.CreateAsync(admin, true);

            CreatedAtAction(
            nameof(GetAdm),
            new { id = admin.AdminId },
            admin);

            if (item.AdminPhoto != null && item.AdminPhoto != "")
            {
                // FileService.MoveTempFile("AdminPhoto", admin.AdminId.ToString(), item.AdminPhoto);
                FileService.MoveTempFileDir("AdminPhoto", admin.AdminId.ToString(), item.AdminPhoto);
            }

            return Ok();


        }

        // DELETE: api/Admins/5
        [HttpDelete("DeleteAdminSetup/{id}")]
        public async Task<IActionResult> DeleteCustomer(long id)
        {
            var item = await _repositoryWrapper.Admin.FindByIDAsync(id);
            if (item == null)
            {
                return NotFound();
            }
            await _repositoryWrapper.EventLog.Delete(item);
            FileService.DeleteFileNameOnly("AdminPhoto", id.ToString());
            await _repositoryWrapper.Admin.DeleteAsync(item, true);

            return NoContent();
        }


        private bool CusExists(long id)
        {
            return _repositoryWrapper.Admin.IsExists(id);
        }

        [HttpPost("changepassword")]
        public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordRequest request)
        {

            var userIdClaim = User.Claims.FirstOrDefault(c => c.Type == "UserID");

            // Convert the user ID to a long (assuming the ID is stored as a long)
            long userIdValue;
            if (!long.TryParse(userIdClaim.Value, out long userId))
            {
                // Handle the case where the user ID cannot be parsed as a long
                return BadRequest("Invalid user ID");
            }
            var user = await _repositoryWrapper.Admin.FindByIDAsync(userId);


            bool flag = SaltedHash.Verify(user.Salt, user.adminPassword, request.CurrentPassword);

            if (flag)
            {
                string password = request.NewPassword;
                string salt = Util.SaltedHash.GenerateSalt();
                password = Util.SaltedHash.ComputeHash(salt, password.ToString());
                
                user.adminPassword = password;
                user.Salt = salt;

                await _repositoryWrapper.Admin.UpdateAsync(user);

            }
            return Ok();
        }

    }
}
