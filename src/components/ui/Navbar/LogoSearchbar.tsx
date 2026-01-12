import { ShoppingCartIcon } from 'lucide-react';
import ActionSearchBar from '../action-search-bar';
import { Link } from '@tanstack/react-router';
import ShopingCart from '../ShoppingCart/ShopingCart';
const LogoSearchbar = () => {
  return (
    <>
      <div className="flex items-center align-bottom p-2 gap-5 justify-center">
        <Link to="/">
          <div className="md:flex hidden md:w-25 items-center justify-center rounded-xl ">
            <img
              src="/Darazlogo.svg"
              alt="Daraz Logo"
              className=" object-cover"
            />
          </div>
        </Link>
        <ActionSearchBar />
        <ShopingCart />
      </div>
    </>
  );
};

export default LogoSearchbar;
