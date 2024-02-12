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
    src: '/homepage/mobile_ad1.svg',
    alt: 'ads',
    width: 327,
    height: 232,
    className: 'w-full lg:hidden',
  },
  {
    src: '/homepage/tablet_ad1.svg',
    alt: 'ads',
    width: 471,
    height: 360,
    className: 'hidden w-full lg:block xl:hidden',
  },
  {
    src: '/homepage/tablet_ad2.svg',
    alt: 'ads',
    width: 471,
    height: 360,
    className: 'hidden w-full lg:block xl:hidden',
  },
  {
    src: '/homepage/desktop_ad1.svg',
    alt: 'ads',
    width: 640,
    height: 360,
    className: 'hidden w-full xl:block',
  },
  {
    src: '/homepage/desktop_ad2.svg',
    alt: 'ads',
    width: 640,
    height: 360,
    className: 'hidden w-full xl:block',
  },
];
