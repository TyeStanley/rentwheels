import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

const LoginDropdown = () => {
  return (
    <Popover>
      <PopoverTrigger>
        <Button variant="primary" className="ml-7">
          Login
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end">
        <Tabs defaultValue="signin" className="w-[400px]">
          <TabsList>
            <TabsTrigger value="signin">Signin</TabsTrigger>
            <TabsTrigger value="signup">Signup</TabsTrigger>
          </TabsList>
          <TabsContent value="signin">signin</TabsContent>
          <TabsContent value="signup">signup</TabsContent>
        </Tabs>
      </PopoverContent>
    </Popover>
  );
};

export default LoginDropdown;
