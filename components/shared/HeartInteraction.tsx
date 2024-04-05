'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import Edit from '@/components/icons/Edit';
import { likeCar } from '@/lib/actions/car.actions';

const heart = {
  outline: '/shared/heart-outline.svg',
  filled: '/shared/heart-filled.svg',
};

const HeartInteraction = ({
  carId,
  isCarLiked,
  isUserLoggedIn,
  myCars = false,
}: {
  carId: string;
  isCarLiked: boolean;
  isUserLoggedIn: boolean;
  myCars?: boolean;
}) => {
  const [isLiked, setIsLiked] = useState(isCarLiked);
  const [isLiking, setIsLiking] = useState(false);

  async function handleHeartClick() {
    const originalIsLiked = isLiked;
    setIsLiking(true);
    setIsLiked(!isLiked);

    try {
      const result = await likeCar(carId);
      setIsLiked(result);
    } catch (error) {
      setIsLiked(originalIsLiked);
    } finally {
      setIsLiking(false);
    }
  }

  if (myCars) {
    return (
      <Link href={`/cars/${carId}`} className="shrink-0">
        <Edit />
      </Link>
    );
  }

  return (
    <button
      className="shrink-0"
      onClick={isUserLoggedIn ? handleHeartClick : () => {}}
      disabled={isLiking}
    >
      <Image
        src={isLiked ? heart.filled : heart.outline}
        alt="Outline Heart"
        width={24}
        height={24}
      />
    </button>
  );
};

export default HeartInteraction;
