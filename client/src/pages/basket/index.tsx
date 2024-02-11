import { useState } from 'react';
import agent from '../../api/agent';
import BasketSummary from './BasketSummary';
import BasketItems from './BasketItems';
import { useAppDispatch, useAppSelector } from '../../features/store';
import { addBasketItemAsync, removeBasketItemAsync, setBasket } from '../../features/basketSlice';

const Index = () => {
  const { basket } = useAppSelector((state) => state.basket);
  const [status, setStatus] = useState<{ adding: boolean; removing: boolean }>({
    adding: false,
    removing: false,
  });

  const dispatch = useAppDispatch();

  async function handleAddItem(productId: number) {
    setStatus((prev) => ({ ...prev, adding: true }));
    try {
      await dispatch(addBasketItemAsync({ productId: productId }));
    } catch (error) {
      console.log(error);
    } finally {
      setStatus((prev) => ({ ...prev, adding: false }));
    }
  }
  async function handleRemoveItem(productId: number, quantity: number = 1) {
    setStatus((prev) => ({ ...prev, removing: true }));
    try {
      await dispatch(removeBasketItemAsync({ productId: productId, quantity: quantity }));
    } catch (error) {
      console.log(error);
    } finally {
      setStatus((prev) => ({ ...prev, removing: false }));
    }
  }

  if (!basket?.items.length) return <h2 className='max-width'>Your Basket is Empty</h2>;

  return (
    <section className='max-width mx-auto py-3 px-2 overflow-x-auto'>
      <BasketItems basket={basket} handleAddItem={handleAddItem} handleRemoveItem={handleRemoveItem} />
      <BasketSummary basket={basket} />
    </section>
  );
};

export default Index;
