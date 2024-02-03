import React, { useEffect, useState } from "react";
import { BasketItemsType, BasketType } from "../../types/BasketType";
import agent from "../../api/agent";
import { ClipLoader } from "react-spinners";
import { MdDelete } from "react-icons/md";
import Loading from "../../components/Loading";

const Basket = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [basket, setBasket] = useState<BasketType | null>(null);

  useEffect(() => {
    agent.Basket.get()
      .then((basket) => setBasket(basket))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loading />;

  if (!basket) return <h2>Your Basket is Empty</h2>;

  return (
    <div className="max-width mx-auto py-3 px-2 overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-300">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left font-semibold text-gray-600">Product</th>
            <th className="px-6 py-3 text-left font-semibold text-gray-600">Price</th>
            <th className="px-6 py-3 text-left font-semibold text-gray-600">Quantity</th>
            <th className="px-6 py-3 text-left font-semibold text-gray-600">Subtotal</th>
            <th className="px-6 py-3 text-left font-semibold text-gray-600">Action</th>
          </tr>
        </thead>
        <tbody>
          {basket.items.map((item) => (
            <tr key={item.productId}>
              <td className="px-6 py-4 whitespace-nowrap">{item.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.price / 100}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.quantity}</td>
              <td className="px-6 py-4 whitespace-nowrap">{((item.price / 100) * item.quantity).toFixed(2)}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button className="text-red-500 lex justify-center w-full h-full">
                  <MdDelete />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Basket;
