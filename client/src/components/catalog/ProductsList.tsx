import React from "react";
import { Product } from "../../types/ProuctTypes";
import ProductCard from "./ProductCard";
interface Props {
  products: Product[];
}
const ProductsList = ({ products }: Props) => {
  return (
    <>
      <ul className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </ul>
    </>
  );
};

export default ProductsList;
