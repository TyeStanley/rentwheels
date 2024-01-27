'use client';

import { useState } from 'react';

import {
  NavbarMobileLinks,
  NavbarMobileMenuHeader,
  MobileAuthButtons,
} from '@/components/Navbar/NavbarMobile';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import Menu from '@/components/icons/Menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SignInForm from '@/components/Navbar/SignInForm';
import SignUpForm from '@/components/Navbar/SignUpForm';

const NavbarMobileMenu = () => {
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
              <SignInForm />
            </TabsContent>
            <TabsContent value="signup">
              <SignUpForm />
            </TabsContent>
          </Tabs>
        ) : (
          <>
            <NavbarMobileLinks />

            <MobileAuthButtons openForm={openForm} />
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default NavbarMobileMenu;
