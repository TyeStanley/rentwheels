import Link from 'next/link';

import Logo from '@/components/icons/Logo';

const NavbarLogo = () => {
  return (
    <Link href="/">
      <Logo />
    </Link>
  );
};

export default NavbarLogo;
