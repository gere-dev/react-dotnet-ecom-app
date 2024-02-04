import React, { useState } from 'react';
import { BasketType } from '../../types/BasketType';
import { IoAddOutline, IoRemoveOutline } from 'react-icons/io5';
import { MdDelete } from 'react-icons/md';
import { currencyFormat } from '../../utils/utils';
import agent from '../../api/agent';
import { useStoreContext } from '../../contexts/StoreContext';

interface Props {
  basket: BasketType;
  handleAddItem(productId: number): void;
  handleRemoveItem(productId: number, quantity?: number): void;
}
const BasketItems = ({ basket, handleAddItem, handleRemoveItem }: Props) => {
  return (
    <table className='min-w-full bg-white border border-gray-300'>
      <thead>
        <tr>
          <th className='px-6 py-3 text-left font-semibold text-gray-600'>Product</th>
          <th className='px-6 py-3 text-left font-semibold text-gray-600'>Price</th>
          <th className='px-6 py-3 text-left font-semibold text-gray-600'>Quantity</th>
          <th className='px-6 py-3 text-left font-semibold text-gray-600'>Subtotal</th>
          <th className='px-6 py-3 text-left font-semibold text-gray-600'>Action</th>
        </tr>
      </thead>
      <tbody>
        {basket?.items.map((item) => (
          <tr key={item.productId}>
            <td className='px-6 py-4 whitespace-nowrap'>
              <div className='flex items-center gap-2'>
                <img className='max-h-[50px]' src={item.pictureUrl} alt='' />
                <span>{item.name}</span>
              </div>
            </td>

            <td className='px-6 py-4 whitespace-nowrap'>{currencyFormat(item.price)}</td>
            <td className='px-6 py-4 whitespace-nowrap'>
              <div className='flex items-center gap-2'>
                <button className='text-red-700' onClick={() => handleRemoveItem(item.productId)}>
                  <IoRemoveOutline />
                </button>
                {item.quantity}
                <button className='text-blue-900' onClick={() => handleAddItem(item.productId)}>
                  <IoAddOutline />
                </button>
              </div>
            </td>
            <td className='px-6 py-4 whitespace-nowrap'>{currencyFormat(item.price * item.quantity)}</td>
            <td className='px-6 py-4 whitespace-nowrap'>
              <button onClick={() => handleRemoveItem(item.productId, item.quantity)} className='text-red-500 lex justify-center w-full h-full'>
                <MdDelete />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default BasketItems;
