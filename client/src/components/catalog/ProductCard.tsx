import React from "react";
import { Product } from "../../types/ProuctTypes";

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  return (
    <li
      className="flex flex-col text-center gap-3 items-center shadow-md rounded-md border p-2"
      key={product.id}
    >
      <div className="flex justify-center items-center  gap-2">
        <span className="h-10 w-10 border overflow-hidden rounded-full text-sm bg-gray-400 text-white flex justify-center items-center">
          {product.name.charAt(0).toUpperCase()}
        </span>
        <span className="">{product.name}</span>
      </div>
      <img
        className="max-h-48 rounded-full shadow-sm border"
        src={product.pictureUrl}
        alt=""
      />
      <span className="text-left text-xl w-full">
        ${(product.price / 100).toFixed(2)}
      </span>

      <div className="w-full  flex flex-start gap-4">
        <button className="text-blue-600 text-xs font-semibold">
          ADD TO CART
        </button>
        <button className="text-blue-600 text-xs font-semibold">VIEW</button>
      </div>
    </li>
  );
};

export default ProductCard;
