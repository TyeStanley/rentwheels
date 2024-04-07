import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Button, buttonVariants } from '@/components/ui/button';
import { logoutUser } from '@/lib/actions/user.actions';
import { DialogClose } from '@/components/ui/dialog';

const MobileAuthButtons = ({
  picture,
  username,
  isUserLoggedIn,
  openForm,
}: {
  picture: string;
  username: string;
  isUserLoggedIn: boolean;
  openForm: () => void;
}) => {
  const router = useRouter();

  const handleLogout = () => {
    logoutUser();

    router.push('/');
  };

  return (
    <section className="mt-5 flex flex-col gap-2.5">
      {isUserLoggedIn ? (
        <>
          <DialogClose asChild>
            <Link
              className={buttonVariants({ variant: 'primaryMenu' })}
              href="/profile"
            >
              <Image
                src={picture}
                alt="User profile picture"
                width="20"
                height="20"
                className="rounded-full"
                style={{ width: '20px', height: '20px' }}
              />
              My Profile
            </Link>
          </DialogClose>
          <DialogClose asChild>
            <Button variant="logout" onClick={handleLogout}>
              Logout
            </Button>
          </DialogClose>
        </>
      ) : (
        <Button variant="primaryMenu" onClick={openForm}>
          Login
        </Button>
      )}
    </section>
  );
};

export default MobileAuthButtons;
