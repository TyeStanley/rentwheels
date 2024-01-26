import React from 'react';
import ThemeToggle from './ThemeToggle';

const NavbarMobile = () => {
  return (
    <div className="md:hidden">
      <ThemeToggle />
    </div>
  );
};

export default NavbarMobile;
