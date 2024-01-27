import NavbarLogo from '@/components/Navbar/NavbarLogo';
import { DialogClose } from '@/components/ui/dialog';
import Close from '@/components/icons/Close';

const NavbarMobileMenuHeader = ({ closeForm }: { closeForm: () => void }) => {
  return (
    <section className="flex items-center justify-between ">
      <NavbarLogo />
      <DialogClose onClick={closeForm}>
        <Close />
      </DialogClose>
    </section>
  );
};

export default NavbarMobileMenuHeader;
