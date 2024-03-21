import Home from '@/components/icons/Home';
import Search from '@/components/icons/Search';
import Plus from '@/components/icons/Plus';

export const navbarMobileLinks = [
  {
    link: '/',
    icon: Home,
    text: 'Home',
  },
  {
    link: '/search',
    icon: Search,
    text: 'Search',
  },
  {
    link: '/add-car',
    icon: Plus,
    text: 'Add Car',
  },
];

export const navbarDesktopLinks = [
  {
    link: '/',
    text: 'Home',
  },
  {
    link: '/search',
    text: 'Search',
  },
  {
    link: '/add-car',
    text: 'Add Car',
  },
];

export const locationList = [
  { label: 'New York', value: 'new york' },
  { label: 'Los Angeles', value: 'los angeles' },
  { label: 'Chicago', value: 'chicago' },
  { label: 'Houston', value: 'houston' },
  { label: 'Phoenix', value: 'phoenix' },
  { label: 'Philadelphia', value: 'philadelphia' },
  { label: 'San Antonio', value: 'san antonio' },
  { label: 'San Diego', value: 'san diego' },
  { label: 'Dallas', value: 'dallas' },
  { label: 'San Jose', value: 'san jose' },
  { label: 'Austin', value: 'austin' },
  { label: 'Jacksonville', value: 'jacksonville' },
];

export const filterOptions = [
  {
    title: 'TYPE',
    options: ['Sport', 'SUV', 'Sedan', 'Coupe', 'Hatchback'],
  },
  {
    title: 'CAPACITY',
    options: ['2 Person', '4 Person', '6 Person', '8 or More'],
  },
];
