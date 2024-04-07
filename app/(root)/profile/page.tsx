import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

import MyCarCards from '@/components/shared/MyCarCards';
import RentedCarCards from '@/components/shared/RentedCarCards';
import EditCover from '@/components/profile/EditCover';
import EditProfile from '@/components/profile/EditProfile';
import Loader from '@/components/shared/Loader';
import { getUserProfile, verifyUser } from '@/lib/actions/user.actions';

const Page = async () => {
  const { id, isUserLoggedIn } = await verifyUser();

  if (!id) redirect('/');

  const profile = await getUserProfile(id);

  if (!profile) redirect('/');

  return (
    <main className="bg-white200 dark:bg-gray900">
      <div className="mx-auto px-6 py-8 lg:max-w-[1024px] xl:max-w-[1440px] xl:px-16">
        <h1 className="text-xl font-bold text-gray900 dark:text-white">
          My Profile
        </h1>

        <section className="relative mt-6 h-[301px] rounded-lg bg-white dark:bg-gray850">
          <div
            style={{ backgroundImage: `url(${profile.coverImage})` }}
            className="flex h-[150px] items-end justify-between rounded-t-lg bg-cover bg-center bg-no-repeat lg:h-[184px]"
          >
            <div className="relative left-2.5 top-[91px] flex flex-col items-start lg:left-8 lg:flex-row lg:items-end lg:gap-8">
              <div className="relative size-[70px] lg:size-[160px]">
                <Image
                  src={profile.picture}
                  alt="user"
                  fill
                  className="rounded-full"
                />
              </div>

              <div className="mt-2.5 lg:relative lg:bottom-3 lg:mt-0 lg:flex lg:flex-col lg:gap-1">
                <h2 className="text-xl font-bold text-gray900 dark:text-white">
                  {profile.username}
                </h2>
                <p className="text-sm text-gray900/50 dark:text-ps100">
                  {profile.role}
                </p>
              </div>
            </div>

            <EditCover
              coverImage={profile.coverImage}
              coverImageKey={profile.coverImageKey}
            />
          </div>

          <EditProfile
            username={profile.username}
            picture={profile.picture}
            pictureKey={profile.pictureKey}
            role={profile.role}
          />
        </section>

        <h3 className="mt-10 font-semibold text-gray400 lg:mt-8">
          Rented cars
        </h3>

        <Suspense fallback={<Loader />}>
          <RentedCarCards isUserLoggedIn={isUserLoggedIn} />
        </Suspense>

        <h3 className="mt-10 font-semibold text-gray400 lg:mt-8">
          My Cars for Rent
        </h3>

        <Suspense fallback={<Loader />}>
          <MyCarCards isUserLoggedIn={isUserLoggedIn} />
        </Suspense>

        <div className="my-12 flex items-center justify-center">
          <Link
            href="/cars/create"
            className="flex h-[56px] w-full items-center justify-center rounded-lg bg-primary font-bold text-white sm:max-w-[228px]"
          >
            Add More Cars for Rent
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Page;
