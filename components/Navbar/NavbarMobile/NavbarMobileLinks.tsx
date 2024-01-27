'use client';

import { usePathname } from 'next/navigation';

import { NavbarMobileLink } from '@/components/Navbar/NavbarMobile';
import { navbarMobileLinks } from '@/constants';

const NavbarMobileLinks = () => {
  const pathname = usePathname();

  return (
    <section className="mt-10 flex flex-col gap-2">
      {navbarMobileLinks.map(({ link, icon, text }) => (
        <NavbarMobileLink
          key={link}
          link={link}
          icon={icon}
          text={text}
          pathname={pathname}
        />
      ))}
    </section>
  );
};

export default NavbarMobileLinks;
