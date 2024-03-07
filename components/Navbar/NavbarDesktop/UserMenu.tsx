import Image from 'next/image';
import Link from 'next/link';

import { LogoutButton } from '@/components/Navbar/NavbarDesktop';
import { buttonVariants } from '@/components/ui/button';
import { GetUserMenuType } from '@/lib/actions/user.actions';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  PopoverClose,
} from '@/components/ui/popover';

const UserMenu = async ({ username, picture }: GetUserMenuType) => {
  return (
    <Popover>
      <PopoverTrigger className="ml-7">
        <Image
          src={picture}
          alt="user button"
          width="44"
          height="44"
          className="rounded-full"
        />
      </PopoverTrigger>
      <PopoverContent align="end" className="flex w-[292px] flex-col gap-4">
        <PopoverClose asChild>
          <Link
            className={buttonVariants({ variant: 'primaryMenu' })}
            href={`/profile/${username}`}
          >
            <Image
              src={picture}
              alt={`User profile of ${username}`}
              width="20"
              height="20"
              className="rounded-full"
            />
            My Profile
          </Link>
        </PopoverClose>

        <PopoverClose>
          <LogoutButton />
        </PopoverClose>
      </PopoverContent>
    </Popover>
  );
};

export default UserMenu;
