import Logo from '@/components/icons/Logo';

const Footer = () => {
  return (
    <footer className="bg-white py-5 dark:bg-gray900">
      <article className="mx-auto flex flex-col justify-between px-5 lg:max-w-[1024px] lg:flex-row lg:py-[4.5rem] xl:max-w-[1440px] xl:px-16">
        <section className="flex flex-col gap-4">
          <Logo className="h-10 w-32 lg:h-12 lg:w-40" />

          <div className="text-sm text-gray400 dark:text-white200 lg:text-base">
            <p>Our vision is to provide convenience</p>
            <p>and help increase your sales business.</p>
          </div>
        </section>

        <section className="mt-12 flex flex-wrap justify-between gap-5 font-medium text-gray400 dark:text-white200 lg:mt-0 xl:gap-12">
          <div className="flex flex-col gap-1.5 lg:w-[9.5rem]">
            <h4 className="mb-4 text-xl font-semibold text-gray800 dark:text-white100 lg:mb-6">
              About
            </h4>
            <p>How it works</p>
            <p>Featured</p>
            <p>Partnership</p>
            <p>Business Relation</p>
          </div>
          <div className="flex flex-col gap-1.5 lg:w-[9.5rem]">
            <h4 className="mb-4 text-xl font-semibold text-gray800 dark:text-white100 lg:mb-6">
              Community
            </h4>
            <p>Events</p>
            <p>Blog</p>
            <p>Podcast</p>
            <p>Invite a friend</p>
          </div>
          <div className="flex flex-col gap-1.5">
            <h4 className="mb-4 text-xl font-semibold text-gray800 dark:text-white100 lg:mb-6">
              Socials
            </h4>
            <p>Discord</p>
            <p>Instagram</p>
            <p>Twitter</p>
            <p>Facebook</p>
          </div>
        </section>
      </article>

      <article className="mx-auto mt-12 px-5 text-sm font-semibold text-gray800 dark:text-white100 lg:mt-0 lg:max-w-[1024px] lg:flex-row lg:justify-between lg:text-base xl:max-w-[1440px] xl:px-16">
        <div className="flex w-full flex-col-reverse lg:flex-row lg:justify-between lg:border-t lg:border-ps50 lg:py-10 lg:dark:border-gray850">
          <h4 className="mt-8 lg:mt-0">
            ©2024 RENTWHEELS. All rights reserved.
          </h4>

          <section className="flex justify-between gap-5">
            <p>Privacy Policy</p>
            <p>Terms & Conditions</p>
          </section>
        </div>
      </article>
    </footer>
  );
};

export default Footer;
