import React from 'react';

const Navigation = () => {
  return (
    <nav className="font-ubuntu">
      <ul className="flex items-center bg-black list-none h-16 text-white max-md:flex-wrap max-md:h-auto max-md:py-2 max-sm:flex-col max-sm:h-auto max-sm:py-2">
        <li className="brand flex items-center font-bold text-xl px-3 max-lg:text-lg max-md:text-base max-sm:my-1">
          <img src={`${process.env.PUBLIC_URL}/logo.jpg.png`} alt="spotify" className="w-11 px-2 max-lg:w-10 max-md:w-9 max-sm:w-10" />
          Spotify
        </li>
        <li className="px-3 max-lg:px-2 max-md:px-2 max-md:text-sm max-sm:py-2 max-sm:px-3">Home</li>
        <li className="px-3 max-lg:px-2 max-md:px-2 max-md:text-sm max-sm:py-2 max-sm:px-3">About</li>
      </ul>
    </nav>
  );
};

export default Navigation;
