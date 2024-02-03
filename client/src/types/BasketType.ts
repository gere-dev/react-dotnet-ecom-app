export interface BasketItemsType {
  productId: string;
  name: string;
  description: string;
  price: number;
  pictureUrl: string;
  brand: string;
  type: string;
  quantityInStock: number;
}

export interface BasketType {
  id: number;
  buyerId: string;
  items: BasketItemsType[];
}
