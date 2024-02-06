namespace API.Entities
{
    public class Basket
    {
        public int Id { get; set; }
        public string BuyerId { get; set; }

        public List<BasketItem> Items { get; set; } = new List<BasketItem>();

        public void AddItem(Product product, int quantity)
        {
            var existingItem = Items.FirstOrDefault(item => item.ProductId == product.id);

            if (existingItem == null)
            {
                // If the item doesn't exist, add a new one
                Items.Add(new BasketItem { Product = product, Quantity = quantity });
            }
            else
            {
                // If the item already exists, update the quantity
                existingItem.Quantity += quantity;
            }
        }


        public void RemoveItem(int productId, int quantity)
        {
            var item = Items.FirstOrDefault(item => item.ProductId == productId);
            if (item == null) return;
            item.Quantity -= quantity;
            if (item.Quantity == 0) Items.Remove(item);
        }
    }
}