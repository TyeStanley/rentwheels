import ThemeToggle from '@/components/Navbar/ThemeToggle';
import { Separator } from '@/components/ui/separator';
import {
  NavbarDesktopLinks,
  AuthMenus,
} from '@/components/Navbar/NavbarDesktop';

const NavbarDesktop = () => {
  return (
    <div className="hidden items-center md:flex">
      <NavbarDesktopLinks />
      <AuthMenus />
      <Separator orientation="vertical" className="mx-5 h-9" />
      <ThemeToggle />
    </div>
  );
};

export default NavbarDesktop;
