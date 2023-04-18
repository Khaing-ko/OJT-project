using TodoApi.Models;

namespace TodoApi.Repository
{
    public interface IHeroListRepository : IRepositoryBase<HeroList>
    {
        Task<IEnumerable<HeroList>> SearchHero(string searchTerm);
        bool IsExists(long id);
    }
}