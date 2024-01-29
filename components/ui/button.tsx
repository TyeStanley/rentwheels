import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center whitespace-nowrap rounded font-semibold transition-colors disabled:pointer-events-none disabled:bg-gray400 disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-white',
        primary: 'h-[2.75rem] bg-primary px-6 text-base text-white',
        navbarDesktopLink: 'text-base text-gray700 dark:text-white200',
        navbarMobileLink:
          'gap-2 bg-transparent p-3 text-sm font-medium text-gray700 dark:text-white',
        primaryMobileMenu:
          'justify-center gap-2 border border-ps50 bg-white py-4 text-sm text-primary dark:border-gray700 dark:bg-gray700 dark:text-white',
        logout: 'justify-center bg-red-500 py-4 text-sm text-white',
        signInUp:
          'h-12 w-full justify-center rounded-lg bg-primary text-white disabled:bg-green-500 disabled:opacity-80 dark:bg-primary dark:disabled:bg-green-500',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export default Button;

export { Button, buttonVariants };
