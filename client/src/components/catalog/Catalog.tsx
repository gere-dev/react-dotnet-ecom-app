import React from "react";
import { Product } from "../../types";
interface Props {
  products: Product[];
  handleAddProduct: () => void;
}
const Catalog = ({ products, handleAddProduct }: Props) => {
  return (
    <>
      <ul>
        {products.map((product) => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
      <button onClick={handleAddProduct}>Add Product</button>
    </>
  );
};

export default Catalog;
