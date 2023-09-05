import Link from "next/link";
import React, { useState, useEffect } from "react";

const Header: React.FC = () => {
  //Menghitung jumlah item yang ada di list favorite  
  const [favoriteCount, setFavoriteCount] = useState(0);

  useEffect(() => {
    // Use localStorage on the client side
    const favoritesData = localStorage.getItem('favorites');
    const favoritesArray = favoritesData ? JSON.parse(favoritesData) : [];
    setFavoriteCount(favoritesArray.length);
  }, []);

  return (
    <nav className="w-full flex flex-row items-center justify-center p-4 fixed top-0 z-10 bg-black">
      <ul className="w-9/12 flex flex-row justify-between">
        <li>
          <Link href="/">Pokedex</Link>
        </li>
        <li>
          <Link href="/pokemon/favourites" className="relative">
            Favorites
            {favoriteCount > 0 && (
              <span className="bg-red-500 text-white text-[10px] rounded-full p-[4px] absolute mr-2">
                {favoriteCount}
              </span>
            )}
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
