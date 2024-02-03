export interface BasketItemsType {
  productId: number;
  name: string;
  description: string;
  price: number;
  pictureUrl: string;
  brand: string;
  type: string;
  quantity: number;
}

export interface BasketType {
  id: number;
  buyerId: string;
  items: BasketItemsType[];
}
