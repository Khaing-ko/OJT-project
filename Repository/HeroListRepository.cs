using System.Data;
using TodoApi.Models;
using Microsoft.EntityFrameworkCore;

namespace TodoApi.Repository
{
    public class HeroListRepository : RepositoryBase<HeroList>, IHeroListRepository
    {
        public HeroListRepository(DbsContext repositoryContext) : base(repositoryContext) { }

        public async Task<IEnumerable<HeroList>> SearchHero(string searchTerm)
        {
            return await RepositoryContext.HeroLists
                        .Where(s => s.Name!.Contains(searchTerm))
                        .OrderBy(s => s.Id).ToListAsync();
        }

        public bool IsExists(long id)
        {
            return RepositoryContext.HeroLists.Any(e => e.Id == id);
        }

    }

}