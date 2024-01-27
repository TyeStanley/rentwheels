import Link from 'next/link';

import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const NavbarDesktopLink = ({
  link,
  text,
  pathname,
}: {
  link: string;
  text: string;
  pathname: string;
}) => {
  return (
    <Link
      href={link}
      className={cn(
        buttonVariants({ variant: 'navbarDesktopLink' }),
        pathname === link && 'text-primary dark:text-primary'
      )}
    >
      {text}
    </Link>
  );
};

export default NavbarDesktopLink;
