import NavbarLogo from '@/components/Navbar/NavbarLogo';
import NavbarDesktop from '@/components/Navbar/NavbarDesktop';
import NavbarMobile from '@/components/Navbar/NavbarMobile';

const Navbar = () => {
  return (
    <nav className="border-b border-[#C3D4E9]/40 bg-white dark:border-gray850 dark:bg-gray900">
      <div className="mx-auto flex items-center justify-between px-6 py-8 md:py-5 lg:max-w-[1024px] xl:max-w-[1440px] xl:px-16">
        <NavbarLogo />

        <NavbarMobile />
        <NavbarDesktop />
      </div>
    </nav>
  );
};

export default Navbar;
