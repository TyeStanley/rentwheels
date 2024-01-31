import { HTMLAttributes } from 'react';

export interface ThemeContextType {
  mode: string;
  setMode: (mode: string) => void;
}

export interface IconProps extends HTMLAttributes<HTMLElement> {}

export interface CreateUserErrors {
  username?: string;
  email?: string;
  password?: string;
}
export interface CreateUserType {
  created?: boolean;
  errors: CreateUserErrors;
}
