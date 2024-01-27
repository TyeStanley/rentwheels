import { LoginMenu, UserMenu } from '@/components/Navbar/NavbarDesktop';

const AuthMenus = () => {
  const isUserLoggedIn = false;

  if (!isUserLoggedIn) return <LoginMenu />;

  return <UserMenu />;
};

export default AuthMenus;
