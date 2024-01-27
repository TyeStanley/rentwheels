import { FC } from 'react';

import { cn } from '@/lib/utils';
import { IconProps } from '@/types';

const Plus: FC<IconProps> = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="17"
      viewBox="0 0 16 17"
      fill="none"
      className={cn('fill-gray700 dark:fill-white', className)}
    >
      <g clip-path="url(#clip0_7532_35727)">
        <path d="M11.7279 0.49996C14.448 0.49996 16 2.03598 16 4.764V12.2361C16 14.9481 14.456 16.5001 11.7359 16.5001H4.26386C1.53583 16.5001 -0.000183105 14.9481 -0.000183105 12.2361V4.764C-0.000183105 2.03598 1.53583 0.49996 4.26386 0.49996H11.7279ZM7.9919 4.908C7.62389 4.908 7.32789 5.20401 7.32789 5.57201V7.82803H5.06387C4.88787 7.82803 4.71986 7.90003 4.59186 8.02004C4.47186 8.14804 4.39986 8.31524 4.39986 8.49204C4.39986 8.86004 4.69586 9.15605 5.06387 9.16405H7.32789V11.4281C7.32789 11.7961 7.62389 12.0921 7.9919 12.0921C8.3599 12.0921 8.6559 11.7961 8.6559 11.4281V9.16405H10.9279C11.2959 9.15605 11.5919 8.86004 11.5919 8.49204C11.5919 8.12404 11.2959 7.82803 10.9279 7.82803H8.6559V5.57201C8.6559 5.20401 8.3599 4.908 7.9919 4.908Z" />
      </g>
      <defs>
        <clipPath id="clip0_7532_35727">
          <rect
            width="16"
            height="16"
            fill="white"
            transform="translate(0 0.5)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default Plus;
