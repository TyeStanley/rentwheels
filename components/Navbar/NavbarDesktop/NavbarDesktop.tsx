import ThemeToggle from '@/components/Navbar/ThemeToggle';
import { Separator } from '@/components/ui/separator';
import {
  NavbarDesktopLinks,
  UserAuthDropdown,
} from '@/components/Navbar/NavbarDesktop';

const NavbarDesktop = () => {
  return (
    <div className="hidden items-center md:flex">
      <NavbarDesktopLinks />

      <UserAuthDropdown />

      <Separator orientation="vertical" className="mx-5 h-9" />

      <ThemeToggle />
    </div>
  );
};

export default NavbarDesktop;
