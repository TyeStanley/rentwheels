import ThemeToggle from '@/components/Navbar/ThemeToggle';
import { NavbarMobileMenu } from '@/components/Navbar/NavbarMobile';

const NavbarMobile = () => {
  return (
    <div className="flex items-center gap-3 md:hidden">
      <ThemeToggle />
      <NavbarMobileMenu />
    </div>
  );
};

export default NavbarMobile;
