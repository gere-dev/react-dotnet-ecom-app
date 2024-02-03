import { MdDelete } from "react-icons/md";
import { useStoreContext } from "../../contexts/StoreContext";
import { CgAdd, CgRemove } from "react-icons/cg";
import { IoAddOutline, IoRemoveOutline } from "react-icons/io5";

const Basket = () => {
  const { basket } = useStoreContext();

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
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center gap-2">
                  <img className="max-h-[50px]" src={item.pictureUrl} alt="" />
                  <span>{item.name}</span>
                </div>
              </td>

              <td className="px-6 py-4 whitespace-nowrap">{item.price / 100}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center gap-2">
                  <button className="text-red-700">
                    <IoRemoveOutline />
                  </button>
                  {item.quantity}
                  <button className="text-blue-900">
                    <IoAddOutline />
                  </button>
                </div>
              </td>
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
