import { verifyUser } from '@/lib/actions/user.actions';
import Image from 'next/image';

const Page = async () => {
  const { id } = await verifyUser();

  return (
    <main className="bg-white200 dark:bg-gray900">
      <div className="mx-auto px-6 py-8 lg:max-w-[1024px] xl:max-w-[1440px] xl:px-16">
        <h1 className="text-xl font-bold text-gray900 dark:text-white">
          My Profile
        </h1>

        <section className="relative mt-6 h-[301px] rounded-lg bg-white dark:bg-gray850">
          {/* Image bg div */}
          <div className="flex h-[150px] items-end justify-between rounded-t-lg bg-[url('/homepage/desktop_ad1.svg')] bg-cover bg-center bg-no-repeat">
            {/* User Image and Name container */}
            <div className="relative left-2.5 top-[91px] flex flex-col items-start">
              <div className="relative size-[70px] lg:size-[160px]">
                <Image
                  src="/userPlaceholder.jpg"
                  alt="user"
                  fill
                  className="rounded-full"
                />
              </div>

              {/* User Name and Role container */}
              <div className="mt-2.5">
                <h2 className="text-xl font-bold text-gray900 dark:text-white">
                  John Doe
                </h2>
                <p className="text-sm text-gray900/50 dark:text-ps100">Agent</p>
              </div>
            </div>

            {/* Edit Cover button */}
            <button className="relative bottom-2.5 right-2.5 h-[26px] w-[68px] rounded-md bg-white/40 text-[0.625rem] text-white dark:bg-gray850/40">
              Edit Cover
            </button>
          </div>

          <button className="absolute bottom-5 right-2.5 h-[36px] w-[110px] rounded-lg bg-primary text-sm text-white">
            Edit Profile
          </button>
        </section>

        <h3 className="mt-10">Rented cars</h3>

        <h3 className="">My Cars for Rent</h3>
      </div>
    </main>
  );
};

export default Page;
