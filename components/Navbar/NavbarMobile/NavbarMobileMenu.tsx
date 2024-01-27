import {
  NavbarMobileLinks,
  NavbarMobileMenuHeader,
  MobileAuthenticationButtons,
} from '@/components/Navbar/NavbarMobile';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import Menu from '@/components/icons/Menu';

const NavbarMobileMenu = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <Menu />
      </DialogTrigger>
      <DialogContent>
        <NavbarMobileMenuHeader />
        <NavbarMobileLinks />
        <MobileAuthenticationButtons />
      </DialogContent>
    </Dialog>
  );
};

export default NavbarMobileMenu;
