import NavbarLogo from '@/components/Navbar/NavbarLogo';
import { DialogClose } from '@/components/ui/dialog';
import Close from '@/components/icons/Close';

const NavbarMobileMenuHeader = () => {
  return (
    <section className="flex items-center justify-between px-1">
      <NavbarLogo />
      <DialogClose>
        <Close />
      </DialogClose>
    </section>
  );
};

export default NavbarMobileMenuHeader;
