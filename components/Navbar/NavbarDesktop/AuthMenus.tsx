import { LoginMenu, UserMenu } from '@/components/Navbar/NavbarDesktop';
import { getUserMenu } from '@/lib/actions/user.actions';

const AuthMenus = async () => {
  const user = await getUserMenu();

  if (!user) return <LoginMenu />;

  return <UserMenu {...user} />;
};

export default AuthMenus;
