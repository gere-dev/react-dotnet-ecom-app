import React from 'react';

const BasketSummary = () => {
  return (
    <div className='flex justify-between w-full'>
      {/* Empty grid item to push the ul to the end */}
      <div className='flex-1'></div>

      {/* COST */}
      <ul className='border flex-1  rounded-b'>
        <CostList title='subtotal' cost={0} />
        <CostList title='delivery fee' cost={0} />
        <CostList title='total' cost={0} />

        <li className='text-sm italic py-2 px-2'>*Order over $100 qualify for free shipping</li>
      </ul>
    </div>
  );
};

export default BasketSummary;

type CostListType = {
  title: string;
  cost: number;
};

const CostList = ({ title, cost }: CostListType) => {
  return (
    <li className='flex justify-between border-b last:border-none py-2 px-2'>
      <span className='capitalize'>{title}</span>
      <span>{cost}</span>
    </li>
  );
};
