import Image from 'next/image';

import { LoginDropdown } from '@/components/Navbar/NavbarDesktop';

const UserAuthDropdown = () => {
  const isUserLoggedIn = false;

  if (!isUserLoggedIn) {
    return <LoginDropdown />;
  }

  return (
    <Image
      src="/userPlaceholder.jpg"
      alt="user button"
      width="44"
      height="44"
      className="rounded-full"
    />
  );
};

export default UserAuthDropdown;
