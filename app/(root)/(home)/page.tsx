import Image from 'next/image';

import { homepageAds } from '@/constants';

export default function Home() {
  return (
    <main className="bg-white200 px-6 py-8 dark:bg-gray900 lg:px-10">
      <div className="mx-auto max-w-[1440px]">
        <div className="relative flex w-full justify-center gap-5">
          {homepageAds.map(({ image, width, height, className }) => (
            <Image
              key={image}
              src={image}
              alt="ads"
              width={width}
              height={height}
              className={className}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
