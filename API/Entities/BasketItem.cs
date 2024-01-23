using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{

    [Table("BasketItems")] //table name will be BasketItems instead of BasketItem(as referred in the class)
    public class BasketItem
    {
        public int Id { get; set; }
        public int Quantity { get; set; }

        // navigation properties
        public int ProductId { get; set; }
        public Product Product { get; set; }

        public int BasketId { get; set; }
        public Basket Basket { get; set; }
    }
}