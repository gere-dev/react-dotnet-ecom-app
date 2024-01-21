import React from "react";
import { Product } from "../../types";

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  return (
    <li className="flex gap-3 items-center " key={product.id}>
      <img
        className="h-10 h-10  rounded-full rounded-full"
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
