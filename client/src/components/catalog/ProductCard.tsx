import React from "react";
import { Product } from "../../types";

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  return (
    <li className="flex gap-3 items-center " key={product.id}>
      <img
        className="h-10 w-10  rounded-full shadow-sm border"
        src={product.pictureUrl}
        alt=""
      />
      <span>
        {product.name}-{product.price}
      </span>
    </li>
  );
};

export default ProductCard;
