'use client';

import { usePathname } from 'next/navigation';

import { NavbarDesktopLink } from '@/components/Navbar/NavbarDesktop';
import { navbarDesktopLinks } from '@/constants';

const NavbarDesktopLinks = () => {
  const pathname = usePathname();

  return (
    <div className="flex gap-7">
      {navbarDesktopLinks.map(({ link, text }) => (
        <NavbarDesktopLink
          key={link}
          link={link}
          text={text}
          pathname={pathname}
        />
      ))}
    </div>
  );
};

export default NavbarDesktopLinks;
