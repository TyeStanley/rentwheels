import Menu from '@/components/icons/Menu';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

const NavbarMenu = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <Menu />
      </DialogTrigger>
      <DialogContent></DialogContent>
    </Dialog>
  );
};

export default NavbarMenu;
