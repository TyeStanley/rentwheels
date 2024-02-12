import Image from 'next/image';

export default function Home() {
  return (
    <main className="bg-white200 px-6 py-8 dark:bg-gray900 lg:px-10">
      <div className="mx-auto max-w-[1440px]">
        <div className="relative flex w-full justify-center gap-5">
          <Image
            src="/homepage/mobile_ad1.svg"
            alt="ads"
            width="327"
            height="232"
            className="w-full lg:hidden"
          />

          <Image
            src="/homepage/tablet_ad1.svg"
            alt="ads"
            width="471"
            height="360"
            className="hidden w-full lg:block xl:hidden"
          />

          <Image
            src="/homepage/tablet_ad2.svg"
            alt="ads"
            width="471"
            height="360"
            className="hidden w-full lg:block xl:hidden"
          />

          <Image
            src="/homepage/desktop_ad1.svg"
            alt="ads"
            width="640"
            height="360"
            className="hidden w-full xl:block"
          />

          <Image
            src="/homepage/desktop_ad2.svg"
            alt="ads"
            width="640"
            height="360"
            className="hidden w-full xl:block"
          />
        </div>
      </div>
    </main>
  );
}
