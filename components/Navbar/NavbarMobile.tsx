import React, { FC } from 'react';
import ThemeToggle from '@/components/Navbar/ThemeToggle';
import NavbarMenu from '@/components/Navbar/NavbarMenu';

const NavbarMobile: FC = () => {
  return (
    <div className="md:hidden">
      <ThemeToggle />
      <NavbarMenu />
    </div>
  );
};

export default NavbarMobile;
