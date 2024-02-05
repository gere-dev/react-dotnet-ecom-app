import { useNavigate } from 'react-router-dom';
import { BasketType } from '../../types/BasketType';
import { currencyFormat } from '../../utils/utils';

interface Props {
  basket: BasketType;
}
const BasketSummary = ({ basket }: Props) => {
  const subTotal = basket?.items.reduce((sum, item) => sum + item.quantity * item.price, 0) ?? 0;
  const deliveryFee = subTotal > 10000 ? 0 : 500;
  const total = subTotal + deliveryFee;

  const nav = useNavigate();
  return (
    <div className='flex justify-between w-full'>
      {/* Empty grid item to push the ul to the end */}
      <div className='flex-1'></div>

      {/* COST */}
      <ul className='border flex-1  rounded-b'>
        <CostList title='subtotal' cost={currencyFormat(subTotal)} />
        <CostList title='delivery fee' cost={currencyFormat(deliveryFee)} />
        <CostList title='total' cost={currencyFormat(total)} />

        <li className='text-sm italic py-2 px-2'>*Order over $100 qualify for free shipping</li>
        <button onClick={() => nav('/checkout')} className='bg-blue-500 text-white w-full py-2 text-sm font-semibold'>
          CHECKOUT
        </button>
      </ul>
    </div>
  );
};

export default BasketSummary;

type CostListType = {
  title: string;
  cost: string;
};

const CostList = ({ title, cost }: CostListType) => {
  return (
    <li className='flex justify-between border-b last:border-none py-2 px-2'>
      <span className='capitalize'>{title}</span>
      <span>{cost}</span>
    </li>
  );
};
