'use client';

import { useState } from 'react';

import {
  NavbarMobileLinks,
  NavbarMobileMenuHeader,
  MobileAuthButtons,
} from '@/components/Navbar/NavbarMobile';
import Menu from '@/components/icons/Menu';
import SignInForm from '@/components/Navbar/SignInForm';
import SignUpForm from '@/components/Navbar/SignUpForm';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const NavbarMobileMenu = ({
  picture,
  username,
  isUserLoggedIn,
}: {
  picture?: string | undefined;
  username?: string | undefined;
  isUserLoggedIn: boolean;
}) => {
  const [showForm, setShowForm] = useState(false);

  const openForm = () => setShowForm(true);
  const closeForm = () => setShowForm(false);

  return (
    <Dialog>
      <DialogTrigger>
        <Menu />
      </DialogTrigger>
      <DialogContent>
        <NavbarMobileMenuHeader closeForm={closeForm} />

        {showForm ? (
          <Tabs defaultValue="signin" className="mt-5 w-full">
            <TabsList>
              <TabsTrigger value="signin">Sign-in</TabsTrigger>
              <TabsTrigger value="signup">Sign-up</TabsTrigger>
            </TabsList>
            <TabsContent value="signin">
              <SignInForm closeForm={closeForm} />
            </TabsContent>
            <TabsContent value="signup">
              <SignUpForm />
            </TabsContent>
          </Tabs>
        ) : (
          <>
            <NavbarMobileLinks />

            <MobileAuthButtons
              picture={picture}
              username={username}
              isUserLoggedIn={isUserLoggedIn}
              openForm={openForm}
            />
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default NavbarMobileMenu;
