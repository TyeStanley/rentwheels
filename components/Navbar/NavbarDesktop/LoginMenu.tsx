import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import SignInForm from '@/components/Navbar/SignInForm';
import SignUpForm from '@/components/Navbar/SignUpForm';

const LoginMenu = () => {
  return (
    <Popover>
      <PopoverTrigger>
        <Button variant="primary" className="ml-7">
          Login
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end">
        <Tabs defaultValue="signin" className="my-2 w-[305px]">
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
      </PopoverContent>
    </Popover>
  );
};

export default LoginMenu;
