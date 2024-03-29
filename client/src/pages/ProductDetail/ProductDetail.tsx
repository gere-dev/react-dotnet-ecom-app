import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Product } from '../../types/ProuctTypes';
import agent from '../../api/agent';
import { useStoreContext } from '../../contexts/StoreContext';
import { ClipLoader } from 'react-spinners';
import { useAppDispatch, useAppSelector } from '../../features/store';
import { addBasketItemAsync, removeBasketItemAsync } from '../../features/basketSlice';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<number>(0);
  const [updateStatus, setUpdateStatus] = useState<boolean>(false);

  const { basket } = useAppSelector((state) => state.basket);

  const dispatch = useAppDispatch();

  const item = basket?.items.find((item) => item?.productId === product?.id);

  useEffect(() => {
    setLoading(true);
    if (item) setQuantity(item.quantity);

    id &&
      agent.Catalog.details(parseInt(id))
        .then((response) => setProduct(response))
        .catch((error) => console.log(error.response))
        .finally(() => setLoading(false));
  }, [id, item]);

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const newQuantity = event.target.value;
    setQuantity(Number(newQuantity));
  }

  async function handleUpdateCart() {
    if (!product) return;

    const productId = product.id;
    if (!item || quantity > item.quantity) {
      const updatedQuantity = item ? quantity - item.quantity : quantity;

      setUpdateStatus(true);
      try {
        await dispatch(addBasketItemAsync({ productId: product.id, quantity: updatedQuantity }));
      } catch (error) {
        console.log(error);
      } finally {
        setUpdateStatus(false); // Reset local state after adding to cart action is completed
      }
    } else {
      setUpdateStatus(true);
      const updatedQuantity = item.quantity - quantity;

      try {
        await dispatch(removeBasketItemAsync({ productId: product.id, quantity: updatedQuantity }));
      } catch (error) {
        console.log(error);
      } finally {
        setUpdateStatus(false); // Reset local state after adding to cart action is completed
      }
    }
  }
  const isDisabled = quantity === item?.quantity;

  if (!product) return <h2>product not found!</h2>;

  return (
    <div className='flex mx-auto max-width w-full px-3 gap-3'>
      <img className='flex-1  overflow-hidden' src={product.pictureUrl} alt='' />
      <div className='flex-1 '>
        <span className='block font-semibold text-xl '>{product.name}</span>
        <p className='text-sm'>{product.description}</p>
        <p>{product.quantityInStock}</p>
        <div className='flex gap-4'>
          <input onChange={handleInputChange} className='custom-input border py-2 px-2' type='number' value={Number(quantity)} min={0} />
          <button
            disabled={isDisabled || (!item && quantity === 0)}
            onClick={handleUpdateCart}
            className={`border ${
              isDisabled || (!item && quantity === 0) ? 'bg-gray-400' : 'bg-blue-500'
            } rounded text-white uppercase p-2 px-4 text-sm w-40 h-11 flex justify-center items-center`}
          >
            {updateStatus ? <ClipLoader color='#fff' size={15} /> : item ? 'update quantity' : 'add to cart'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
