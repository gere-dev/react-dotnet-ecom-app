import { useState } from 'react';
import agent from '../../api/agent';
import BasketSummary from './BasketSummary';
import BasketItems from './BasketItems';
import { useAppDispatch, useAppSelector } from '../../features/store';
import { removeItem, setBasket } from '../../features/basketSlice';

const Index = () => {
  const { basket } = useAppSelector((state) => state.basket);
  const [loading, setLoading] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  function handleAddItem(productId: number) {
    setLoading(true);
    agent.Basket.addItem(productId)
      .then((basket) => dispatch(setBasket(basket)))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }
  function handleRemoveItem(productId: number, quantity: number = 1) {
    setLoading(true);
    agent.Basket.removeItem(productId, quantity)
      .then(() => dispatch(removeItem({ productId, quantity })))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }

  console.log(basket);

  if (!basket?.items.length) return <h2 className='max-width'>Your Basket is Empty</h2>;

  return (
    <section className='max-width mx-auto py-3 px-2 overflow-x-auto'>
      <BasketItems basket={basket} handleAddItem={handleAddItem} handleRemoveItem={handleRemoveItem} />
      <BasketSummary basket={basket} />
    </section>
  );
};

export default Index;
