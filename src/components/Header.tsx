import Link from "next/link";
import React from "react";

const Header: React.FC = () => {
  return (
    <nav className="w-full flex flex-row items-center justify-center p-2">
      <ul className="w-9/12 flex flex-row justify-between">
        <li>
          <Link href="/">Pokedex</Link>
        </li>
        <li>
            <Link href="/pokemon/favourites">
                Favourites
            </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
