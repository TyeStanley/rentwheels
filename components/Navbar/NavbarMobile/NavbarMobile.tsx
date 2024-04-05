import ThemeToggle from '@/components/Navbar/ThemeToggle';
import { NavbarMobileMenu } from '@/components/Navbar/NavbarMobile';
import { getUserMenu } from '@/lib/actions/user.actions';

const NavbarMobile = async () => {
  const user = await getUserMenu();

  let isUserLoggedIn = false;

  if (user.username && user.picture) {
    isUserLoggedIn = true;
  } else {
    isUserLoggedIn = false;
  }

  const userProps = { ...user, isUserLoggedIn };

  return (
    <div className="flex items-center gap-3 md:hidden">
      <ThemeToggle />
      <NavbarMobileMenu {...userProps} />
    </div>
  );
};

export default NavbarMobile;
