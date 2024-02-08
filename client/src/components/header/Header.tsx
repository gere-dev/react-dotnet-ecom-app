import React from 'react';
import { Link } from 'react-router-dom';
import { navLink } from '../../utils/constants';
import { BiCart, BiCartAlt } from 'react-icons/bi';
import { BsCartFill, BsCartXFill } from 'react-icons/bs';
import { useStoreContext } from '../../contexts/StoreContext';
import { useAppSelector, RootState } from '../../features/store';

const Header = () => {
  const { basket } = useAppSelector((state) => state.basket);
  const totalItems = basket?.items.reduce((sum, item) => sum + item.quantity, 0);
  return (
    <div className='bg-blue-600  h-14 text-white'>
      <div className='max-width h-full w-full  mx-auto flex items-center px-3 justify-between'>
        {/* logo */}
        <span>Logo</span>

        {/* main nav links */}
        <ul className='flex gap-3'>
          {navLink.slice(0, 3).map((nav, index) => {
            return (
              <li key={index}>
                <Link className='capitalize' to={nav.path}>
                  {nav.title}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* auth links */}
        <ul className='flex gap-3'>
          <li className='flex justify-center items-center text-lg mr-2 relative'>
            <Link to='/basket'>
              <span className='absolute bg-red-600 h-4 w-4 text-[10px] rounded-full flex justify-center items-center -top-1 -right-2'>
                {totalItems}
              </span>
              <BsCartFill />
            </Link>
          </li>
          {navLink.slice(3).map((nav, index) => {
            return (
              <li key={index}>
                <Link className='capitalize' to={nav.path}>
                  {nav.title}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Header;
