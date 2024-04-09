import { Car, Transmission } from '@prisma/client';
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

export interface Params {
  city?: string;
  from?: string;
  to?: string;
  search?: string;
  type?: string;
  capacity?: string;
  price?: string;
  page?: number;
  carsPerPage?: number;
}

export interface CarCardsProps {
  searchParams: Params;
  isUserLoggedIn: boolean;
}

export interface CarImage {
  url: string;
  key: string;
  blurDataURL: string;
}

export interface CarDetails extends Car {
  images: CarImage[];
  isCarLiked?: boolean;
}

export interface UpdateCarData {
  id: string;
  title: string;
  type: 'Sport' | 'SUV' | 'Sedan' | 'Coupe' | 'Hatchback';
  rentPrice: number;
  capacity: number;
  transmission: Transmission;
  location: string;
  fuelCapacity: number;
  description: string;
  images: CarImage[];
}

export interface CarData {
  title: string;
  type: 'Sport' | 'SUV' | 'Sedan' | 'Coupe' | 'Hatchback';
  rentPrice: number;
  capacity: number;
  transmission: string;
  location: string;
  fuelCapacity: number;
  description: string;
}

export interface FullCarData {
  id: string;
  title: string;
  type: string;
  rentPrice: number;
  capacity: number;
  location: string;
  description: string;
  transmission: Transmission;
  fuelCapacity: number;
  images: { url: string; key: string; blurDataURL: string }[];
  isCarLiked?: boolean;
}
