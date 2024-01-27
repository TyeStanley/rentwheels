import Link from 'next/link';
import { FC } from 'react';

import { buttonVariants } from '@/components/ui/button';
import { DialogClose } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { IconProps } from '@/types';

const NavbarMobileLink = ({
  link,
  icon: Icon,
  text,
  pathname,
}: {
  link: string;
  icon: FC<IconProps>;
  text: string;
  pathname: string;
}) => {
  const isActive = pathname === link;

  return (
    <DialogClose asChild>
      <Link
        href={link}
        className={cn(
          buttonVariants({ variant: 'navbarMobileLink' }),
          isActive && 'bg-primary text-white'
        )}
      >
        <span className="flex size-6 items-center justify-center">
          <Icon className={isActive ? 'fill-white' : undefined} />
        </span>
        {text}
      </Link>
    </DialogClose>
  );
};

export default NavbarMobileLink;
