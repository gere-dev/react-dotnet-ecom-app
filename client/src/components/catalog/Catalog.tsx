import React from "react";
import { Product } from "../../types";
import ProductsList from "./ProductsList";
interface Props {
  products: Product[];
  handleAddProduct: () => void;
}
const Catalog = ({ products, handleAddProduct }: Props) => {
  return (
    <div className="max-width mx-auto py-3">
      <ProductsList products={products} />
      <button
        className="px-3 py-2 bg-blue-500 text-white rounded"
        onClick={handleAddProduct}
      >
        Add Product
      </button>
    </div>
  );
};

export default Catalog;
