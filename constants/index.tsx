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

export const homepageAds = [
  {
    image: '/homepage/mobile_ad1.svg',
    width: 327,
    height: 232,
    className: 'w-full lg:hidden',
  },
  {
    image: '/homepage/tablet_ad1.svg',
    width: 471,
    height: 360,
    className: 'hidden w-full lg:block xl:hidden',
  },
  {
    image: '/homepage/tablet_ad2.svg',
    width: 471,
    height: 360,
    className: 'hidden w-full lg:block xl:hidden',
  },
  {
    image: '/homepage/desktop_ad1.svg',
    width: 640,
    height: 360,
    className: 'hidden w-full xl:block',
  },
  {
    image: '/homepage/desktop_ad2.svg',
    width: 640,
    height: 360,
    className: 'hidden w-full xl:block',
  },
];
