using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
#pragma warning disable IDE0290

    public class StoreContext : DbContext
    {
        public DbSet<Product> Products { get; set; }

        public StoreContext(DbContextOptions<StoreContext> options) : base(options) { }
    }

#pragma warning restore IDE0290
}
