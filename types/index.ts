import { HTMLAttributes } from 'react';

export interface ThemeContextType {
  mode: string;
  setMode: (mode: string) => void;
}

export interface IconProps extends HTMLAttributes<HTMLElement> {}
