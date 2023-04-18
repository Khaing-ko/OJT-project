using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TodoApi.Models;
using TodoApi.Util;
using TodoApi.Repository;

namespace TodoApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HeroListsController : BaseController<HeroListsController>
    {
        private readonly IRepositoryWrapper _repositoryWrapper;

        public HeroListsController(IRepositoryWrapper RW)
        {
            _repositoryWrapper = RW;
        }

        // GET: api/HeroLists
        [HttpGet]
        public async Task<ActionResult<IEnumerable<HeroList>>> GetCus()
        {
            var Cus = await _repositoryWrapper.HeroList.FindAllAsync();
            return Ok(Cus);
        }

        // GET: api/HeroLists/5
        [HttpGet("{id}")]
        public async Task<ActionResult<HeroList>> GetCus(long id)
        {
            var cus = await _repositoryWrapper.HeroList!.FindByIDAsync(id);
            if (cus == null)
            {
                return NotFound();
            }
            return cus;
        }

        // PUT: api/HeroLists/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCus(long id, HeroList item)
        {
            if (id != item.Id)
            {
                return BadRequest();
            }

            HeroList? objHeroList;
            try
            {
                objHeroList = await _repositoryWrapper.HeroList.FindByIDAsync(id);
                if (objHeroList == null)
                    throw new Exception("Invalid HeroList ID");
                else
                {
                    objHeroList.Name = item.Name;
                    objHeroList.Age = item.Age;
                    objHeroList.Address = item.Address;
                    await _repositoryWrapper.HeroList.UpdateAsync(objHeroList);
                }
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
        public async Task<ActionResult<IEnumerable<HeroList>>> SearchHero(string term)
        {
            var cusList = await _repositoryWrapper.HeroList.SearchHero(term);
            return Ok(cusList);
        }

        // POST: api/HeroLists
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<HeroList>> PostCus(HeroList item)
        {
            await _repositoryWrapper.HeroList.CreateAsync(item, true);
            return CreatedAtAction(nameof(GetCus), new { id = item.Id }, item);
        }



        // DELETE: api/HeroLists/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteHeroList(long id)
        {
            var item = await _repositoryWrapper.HeroList.FindByIDAsync(id);
            if (item == null)
            {
                return NotFound();
            }
            FileService.DeleteFileNameOnly("HeroListPhoto", id.ToString());
            await _repositoryWrapper.HeroList.DeleteAsync(item, true);

            return NoContent();
        }


        private bool CusExists(long id)
        {
            return _repositoryWrapper.HeroList.IsExists(id);
        }
    }
}
