import { LoginMenu, UserMenu } from '@/components/Navbar/NavbarDesktop';
import { getUser } from '@/lib/actions/user.actions';

const AuthMenus = async () => {
  const user = await getUser();

  if (!user) return <LoginMenu />;

  return <UserMenu {...user} />;
};

export default AuthMenus;
