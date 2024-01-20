using System;
using System.Linq;

namespace API.Data
{
    public static class DbInitializer
    {
        public static void Initialize(StoreContext context)
        {
            if (context.Products.Any()) return;

            var products = SampleData.GetSampleProducts();
            context.Products.AddRange(products);
            context.SaveChanges();
        }
    }
};
