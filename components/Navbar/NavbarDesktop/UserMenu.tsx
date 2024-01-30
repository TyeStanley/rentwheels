import Image from 'next/image';

import LogoutButton from '@/components/Navbar/NavbarDesktop';
import Button from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { GetUserType } from '@/lib/actions/user.actions';

const UserMenu = async ({
  id,
  username,
  email,
  createdAt,
  updatedAt,
}: GetUserType) => {
  return (
    <Popover>
      <PopoverTrigger className="ml-7">
        <Image
          src="/userPlaceholder.jpg"
          alt="user button"
          width="44"
          height="44"
          className="rounded-full"
        />
      </PopoverTrigger>
      <PopoverContent align="end" className="flex w-[292px] flex-col gap-4">
        <Button variant="primaryMenu" className="w-full">
          <Image
            src="/userPlaceholder.jpg"
            alt="User profile picture"
            width="20"
            height="20"
            className="rounded-full"
          />
          My Profile
        </Button>
        <LogoutButton />
      </PopoverContent>
    </Popover>
  );
};

export default UserMenu;
