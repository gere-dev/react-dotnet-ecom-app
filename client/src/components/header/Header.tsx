import React from "react";
import { Link } from "react-router-dom";
import { navLink } from "../../utils/constants";

const Header = () => {
  return (
    <div className="bg-blue-600  h-14 text-white">
      <div className="max-width h-full w-full  mx-auto flex items-center px-3 justify-between">
        {/* logo */}
        <span>Logo</span>
        <ul className="flex gap-3">
          {navLink.map((nav) => {
            return (
              <li>
                <Link className="capitalize" to={nav.path}>
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
