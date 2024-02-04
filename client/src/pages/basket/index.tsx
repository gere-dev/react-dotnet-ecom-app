import { MdDelete } from 'react-icons/md';
import { useStoreContext } from '../../contexts/StoreContext';
import { CgAdd, CgRemove } from 'react-icons/cg';
import { IoAddOutline, IoRemoveOutline } from 'react-icons/io5';
import { useState } from 'react';
import agent from '../../api/agent';
import { currencyFormat } from '../../utils/utils';
import BasketSummary from './BasketSummary';
import BasketItems from './BasketItems';

const Index = () => {
  const { basket, setBasket, removeItem } = useStoreContext();
  const [loading, setLoading] = useState<boolean>(false);

  function handleAddItem(productId: number) {
    setLoading(true);
    agent.Basket.addItem(productId)
      .then((basket) => setBasket(basket))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }

  function handleRemoveItem(productId: number, quantity: number = 1) {
    setLoading(true);
    agent.Basket.removeItem(productId, quantity)
      .then(() => removeItem(productId, quantity))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }

  console.log(basket);

  if (!basket?.items.length) return <h2 className='max-width'>Your Basket is Empty</h2>;

  return (
    <section className='max-width mx-auto py-3 px-2 overflow-x-auto'>
      <BasketItems basket={basket} handleAddItem={handleAddItem} handleRemoveItem={handleRemoveItem} />
      <BasketSummary />
    </section>
  );
};

export default Index;
