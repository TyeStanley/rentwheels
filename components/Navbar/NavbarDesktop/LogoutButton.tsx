'use client';

import Button from '@/components/ui/button';
import { logoutUser } from '@/lib/actions/user.actions';

const LogoutButton = () => {
  return (
    <Button variant="logout" className="w-full" onClick={() => logoutUser()}>
      Logout
    </Button>
  );
};

export default LogoutButton;
