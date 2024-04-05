'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import SignInForm from '@/components/Navbar/SignInForm';
import SignUpForm from '@/components/Navbar/SignUpForm';
import { Button, buttonVariants } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverClose,
} from '@/components/ui/popover';
import { logoutUser } from '@/lib/actions/user.actions';

const AuthMenus = ({
  user,
}: {
  user: { username: string; picture: string };
}) => {
  const router = useRouter();

  const handleLogout = () => {
    logoutUser();
    router.push('/');
  };

  return (
    <Popover>
      <PopoverTrigger className="ml-7">
        {!user.username || !user.picture ? (
          <Button variant="primary">Login</Button>
        ) : (
          <Image
            src={user.picture}
            alt="user button"
            width="44"
            height="44"
            className="rounded-full"
          />
        )}
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className={`${
          user.username && user.picture && 'flex w-[292px] flex-col gap-4'
        }`}
      >
        {!user.username || !user.picture ? (
          <Tabs defaultValue="signin" className="my-2 w-[305px]">
            <TabsList>
              <TabsTrigger value="signin">Sign-in</TabsTrigger>
              <TabsTrigger value="signup">Sign-up</TabsTrigger>
            </TabsList>
            <TabsContent value="signin">
              <SignInForm signinClose={true} />
            </TabsContent>
            <TabsContent value="signup">
              <SignUpForm />
            </TabsContent>
          </Tabs>
        ) : (
          <>
            <PopoverClose asChild>
              <Link
                className={buttonVariants({ variant: 'primaryMenu' })}
                href="/profile"
              >
                <Image
                  src={user.picture}
                  alt={`User profile of ${user.username}`}
                  width="20"
                  height="20"
                  className="rounded-full"
                />
                My Profile
              </Link>
            </PopoverClose>

            <PopoverClose>
              <Button
                variant="logout"
                className="w-full"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </PopoverClose>
          </>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default AuthMenus;
