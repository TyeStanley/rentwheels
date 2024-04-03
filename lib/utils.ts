import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import queryString from 'query-string';
import { Params } from '@/types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function capitalizeFirstLetterOfEachWord(str: string): string {
  return str
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

export function modifySearchParams(params: string, change: Partial<Params>) {
  const param = queryString.parse(params);
  Object.assign(param, change);

  return queryString.stringify(param, {
    skipEmptyString: true,
  });
}

export const handleShowMore = (searchParams: Params) => {
  let page = 2;

  if (searchParams.page) page = Number(searchParams.page) + 1;

  const param = modifySearchParams(searchParams.toString(), {
    page,
  });

  return '?' + param;
};

export async function imageURLToFile({ imageURL }: { imageURL: string }) {
  try {
    const response = await fetch(imageURL);
    if (!response.ok) throw new Error('Network response was not ok.');

    const imageBlob = await response.blob();

    const file = new File([imageBlob], 'image.jpg', {
      type: imageBlob.type,
    });

    return file;
  } catch (error) {
    console.error('Error converting image URL to file:', error);
    return null;
  }
}
