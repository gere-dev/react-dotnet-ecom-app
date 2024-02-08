import React, { useState } from 'react';
import { Product } from '../../types/ProuctTypes';
import { Link } from 'react-router-dom';
import agent from '../../api/agent';
import { ClipLoader } from 'react-spinners';
import { useAppDispatch, useAppSelector } from '../../features/store';
import { addBasketItemAsync, setBasket } from '../../features/basketSlice';

interface Props {
  product: Product;
}

const ProductCard = ({ product }: Props) => {
  const [loading, setLoading] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const handleAddToCart = async () => {
    setLoading(true);
    try {
      await dispatch(addBasketItemAsync({ productId: product.id, quantity: 1 }));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // Reset local state after adding to cart action is completed
    }
  };

  return (
    <li className='flex flex-col text-center gap-3 items-center shadow-md rounded-md border p-2' key={product.id}>
      <div className='flex justify-center items-center  gap-2'>
        <span className='h-10 w-10 border overflow-hidden rounded-full text-sm bg-gray-400 text-white flex justify-center items-center'>
          {product.name.charAt(0).toUpperCase()}
        </span>
        <span className=''>{product.name}</span>
      </div>
      <img className='max-h-48 rounded-full shadow-sm border' src={product.pictureUrl} alt='' />
      <span className='text-left text-xl w-full'>${(product.price / 100).toFixed(2)}</span>

      <div className='w-full  flex flex-start gap-4'>
        {loading ? (
          <button className='h-5 w-5'>
            <ClipLoader className='h-full w-full' color='#36d7b7' />
          </button>
        ) : (
          <button className='text-blue-600 text-xs font-semibold' onClick={handleAddToCart}>
            ADD TO CART
          </button>
        )}
        <Link to={`product-detail/${product.id}`} className='text-blue-600 text-xs font-semibold'>
          VIEW
        </Link>
      </div>
    </li>
  );
};

export default ProductCard;
