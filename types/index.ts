import { HTMLAttributes } from 'react';

export interface ThemeContextType {
  mode: string;
  setMode: (mode: string) => void;
}

export interface IconProps extends HTMLAttributes<HTMLElement> {}

export interface createUserErrors {
  username?: string;
  email?: string;
  password?: string;
}
export interface createUserType {
  created?: boolean;
  errors: createUserErrors;
}
