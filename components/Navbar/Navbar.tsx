import NavbarLogo from '@/components/Navbar/NavbarLogo';
import NavbarDesktop from '@/components/Navbar/NavbarDesktop';
import NavbarMobile from '@/components/Navbar/NavbarMobile';

const Navbar = () => {
  return (
    <nav className="w-full border-b border-[#C3D4E9]/40 bg-white px-6 py-8 dark:border-gray850 dark:bg-gray900 md:py-5 lg:px-10">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between">
        <NavbarLogo />

        <NavbarMobile />
        <NavbarDesktop />
      </div>
    </nav>
  );
};

export default Navbar;
