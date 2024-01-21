import React, { useEffect, useState } from "react";
import { Product } from "../../types";
import ProductsList from "./ProductsList";
import { Products } from "../../products";

const Catalog = () => {
  const [products, setProducts] = useState<Products[]>([]);

  useEffect(() => {
    fetch("http://localhost:5027/api/products")
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <div className="max-width mx-auto py-3 px-2">
      <ProductsList products={products} />
    </div>
  );
};

export default Catalog;
