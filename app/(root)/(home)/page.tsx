import Image from 'next/image';

import { homepageAds } from '@/constants';

export default function Home() {
  return (
    <main className="bg-white200 px-6 py-8 dark:bg-gray900 lg:px-10">
      <div className="mx-auto max-w-[1440px]">
        <section className="relative flex w-full justify-center gap-5">
          {homepageAds.map((ad, index) => (
            <Image
              key={index}
              src={ad.src}
              alt={ad.alt}
              width={ad.width}
              height={ad.height}
              className={ad.className}
            />
          ))}
        </section>
      </div>
    </main>
  );
}
