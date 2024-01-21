import React from "react";
import { Product } from "../../types";
import ProductCard from "./ProductCard";
interface Props {
  products: Product[];
}
const ProductsList = ({ products }: Props) => {
  return (
    <>
      <ul className="flex flex-col gap-3">
        {products.map((product) => (
          <ProductCard product={product} />
        ))}
      </ul>
    </>
  );
};

export default ProductsList;
