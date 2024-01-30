import { LoginMenu, UserMenu } from '@/components/Navbar/NavbarDesktop';
import { verifyUser } from '@/lib/actions/user.actions';

const AuthMenus = async () => {
  const { id } = await verifyUser();

  if (!id) return <LoginMenu />;

  return <UserMenu />;
};

export default AuthMenus;
