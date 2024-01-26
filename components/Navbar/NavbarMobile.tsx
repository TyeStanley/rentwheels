import React, { FC } from 'react';
import ThemeToggle from '@/components/Navbar/ThemeToggle';
import NavbarMenu from '@/components/Navbar/NavbarMenu';

const NavbarMobile: FC = () => {
  return (
    <div className="flex items-center gap-3 md:hidden">
      <ThemeToggle />
      <NavbarMenu />
    </div>
  );
};

export default NavbarMobile;
