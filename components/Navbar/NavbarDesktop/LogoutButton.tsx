'use client';

import { useRouter } from 'next/navigation';

import Button from '@/components/ui/button';
import { logoutUser } from '@/lib/actions/user.actions';

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = () => {
    logoutUser();

    router.push('/');
  };

  return (
    <Button variant="logout" className="w-full" onClick={handleLogout}>
      Logout
    </Button>
  );
};

export default LogoutButton;
