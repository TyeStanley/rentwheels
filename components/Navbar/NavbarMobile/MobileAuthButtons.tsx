import Image from 'next/image';

import { Button } from '@/components/ui/button';

const MobileAuthButtons = ({ openForm }: { openForm: () => void }) => {
  const isUserLoggedIn = false;

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
        <Button variant="primaryMobileMenu" onClick={openForm}>
          Login
        </Button>
      )}
    </section>
  );
};

export default MobileAuthButtons;
