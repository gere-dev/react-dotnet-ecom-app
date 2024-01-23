import React, { useEffect, useState } from "react";
import ProductsList from "./ProductsList";
import { Products } from "../../products";
import agent from "../../api/agent";

const Catalog = () => {
  const [products, setProducts] = useState<Products[]>([]);

  useEffect(() => {
    agent.Catalog.list().then((products) => setProducts(products));
  }, []);

  return (
    <div className="max-width mx-auto py-3 px-2">
      <ProductsList products={products} />
    </div>
  );
};

export default Catalog;
