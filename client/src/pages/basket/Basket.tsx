import React, { useEffect, useState } from "react";
import { BasketItemsType, BasketType } from "../../types/BasketType";
import agent from "../../api/agent";
import { ClipLoader } from "react-spinners";

const Basket = () => {
  const [loading, setLoading] = useState(false);
  const [basket, setBasket] = useState<BasketType | null>(null);
  useEffect(() => {
    agent.Basket.get()
      .then((basket) => setBasket(basket))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);
  if (loading) return <ClipLoader />;

  if (!basket) return <h2>Your Basket is Empty</h2>;
  return <div className="max-width mx-auto py-3 px-2">buyer id ={basket.buyerId}</div>;
};

export default Basket;
