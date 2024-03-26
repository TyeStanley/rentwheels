import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import queryString from 'query-string';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function capitalizeFirstLetterOfEachWord(str: string): string {
  return str
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

type SearchParams = {
  city: string;
  from: string;
  to: string;
  search: string;
  type: string;
  capacity: string;
  price: number;
};

export function modifySearchParams(
  params: string,
  change: Partial<SearchParams>
) {
  const param = queryString.parse(params);
  Object.assign(param, change);

  return queryString.stringify(param, {
    skipEmptyString: true,
  });
}
