import Image from 'next/image';

import { Button } from '@/components/ui/button';

const MobileAuthButtons = () => {
  const isUserLoggedIn = true;

  return (
    <section className="mt-5 flex flex-col gap-2.5">
      {isUserLoggedIn ? (
        <>
          <Button variant="primaryMobileMenu">
            <Image
              src="/userPlaceholder.jpg"
              alt="User profile picture"
              width="20"
              height="20"
              className="rounded-full"
            />
            My Profile
          </Button>
          <Button variant="logout">Logout</Button>
        </>
      ) : (
        <Button variant="primaryMobileMenu">Login</Button>
      )}
    </section>
  );
};

export default MobileAuthButtons;
