import React from "react";
import { Link } from "react-router-dom";
import { navLink } from "../../utils/constants";

const Header = () => {
  return (
    <div className="bg-blue-600  h-14 text-white">
      <div className="max-width h-full w-full  mx-auto flex items-center px-3 justify-between">
        {/* logo */}
        <span>Logo</span>

        {/* main nav links */}
        <ul className="flex gap-3">
          {navLink.slice(0, 3).map((nav, index) => {
            return (
              <li key={index}>
                <Link className="capitalize" to={nav.path}>
                  {nav.title}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* auth links */}
        <ul className="flex gap-3">
          {navLink.slice(3).map((nav, index) => {
            return (
              <li key={index}>
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
