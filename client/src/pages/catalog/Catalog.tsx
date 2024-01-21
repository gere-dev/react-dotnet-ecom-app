import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiLink } from "../../utils/constants";
import { Product } from "../../types/ProuctTypes";
import agent from "../../api/agent";

const Catalog = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    id &&
      agent.Catalog.details(parseInt(id))
        .then((response) => setProduct(response))
        .catch((error) => console.log(error))
        .finally(() => setLoading(false));
  }, []);

  if (loading) return <h2>loading...</h2>;
  if (!product) return <h2>product not found!</h2>;
  return (
    <div className="flex mx-auto max-width w-full px-3 gap-3">
      <img
        className="flex-1  overflow-hidden"
        src={product.pictureUrl}
        alt=""
      />
      <div className="flex-1 ">
        <span className="block font-semibold text-xl ">{product.name}</span>
        <p className="text-sm">{product.description}</p>
      </div>
    </div>
  );
};

export default Catalog;
