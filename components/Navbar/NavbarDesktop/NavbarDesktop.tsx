import ThemeToggle from '@/components/Navbar/ThemeToggle';
import { Separator } from '@/components/ui/separator';
import {
  NavbarDesktopLinks,
  AuthMenus,
} from '@/components/Navbar/NavbarDesktop';
import { getUserMenu } from '@/lib/actions/user.actions';

const NavbarDesktop = async () => {
  const user = await getUserMenu();

  return (
    <div className="hidden items-center md:flex">
      <NavbarDesktopLinks />
      <AuthMenus user={user} />
      <Separator orientation="vertical" className="mx-5 h-9" />
      <ThemeToggle />
    </div>
  );
};

export default NavbarDesktop;
