import React from 'react';

import Logo from '@/components/icons/Logo';
import Menu from '../icons/Menu';

const Navbar = () => {
  return (
    <nav className="w-full bg-white p-6 dark:bg-gray900">
      <div className="flex max-w-xs items-center justify-between">
        <Logo />

        <div>
          <Menu />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
