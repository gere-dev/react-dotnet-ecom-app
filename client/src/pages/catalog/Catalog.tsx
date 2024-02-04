import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Product } from '../../types/ProuctTypes';
import agent from '../../api/agent';
import { useStoreContext } from '../../contexts/StoreContext';

const Catalog = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<number>(0);

  const { basket } = useStoreContext();

  const item = basket?.items.find((item) => item?.productId == product?.id);

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

  if (loading) return <h2>loading...</h2>;

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
          {quantity ? (
            <button className='border bg-blue-500 rounded text-white uppercase py-2 px-4 text-sm'>update cart</button>
          ) : (
            <button className='border bg-blue-500 rounded text-white uppercase p-2 px-4 text-sm'>add to cart</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Catalog;
