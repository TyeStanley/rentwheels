'use client';

import * as React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { DayPicker } from 'react-day-picker';

import { cn } from '@/lib/utils';

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn('p-3', className)}
      classNames={{
        months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
        month: 'space-y-4',
        caption: 'flex justify-center pt-1 relative items-center',
        caption_label: 'text-sm font-medium text-gray900 dark:text-white',
        nav: 'space-x-1 flex items-center',
        nav_button: 'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100',
        nav_button_previous: 'absolute left-1',
        nav_button_next: 'absolute right-1',
        table: 'w-full border-collapse space-y-1',
        head_row: 'flex',
        head_cell:
          'text-gray700 rounded-md w-9 font-normal text-[0.8rem] dark:text-white',
        row: 'flex w-full mt-2',
        cell: 'h-9 w-9 text-center text-sm rounded-full p-0 relative',
        day: 'h-9 w-9 p-0 font-normal hover:bg-primary hover:text-white dark:text-white dark:hover:text-white rounded-full',
        day_range_end: 'day-range-end',
        day_selected:
          'bg-primary text-white rounded-full dark:bg-primary dark:text-white focus:text-white focus:bg-primary',
        day_today:
          'bg-ps50 hover:bg-primary hover:text-white dark:hover:bg-primary rounded-full text-gray800 dark:bg-gray800 dark:text-slate-50',
        day_disabled: 'text-slate-500 opacity-50 dark:text-slate-400',
        day_range_middle:
          'aria-selected:bg-slate-100 aria-selected:text-slate-900 dark:aria-selected:bg-slate-800 dark:aria-selected:text-slate-50',
        day_hidden: 'invisible',
        ...classNames,
      }}
      components={{
        IconLeft: ({ ...props }) => (
          <ChevronLeft className="size-4 dark:stroke-white" />
        ),
        IconRight: ({ ...props }) => (
          <ChevronRight className="size-4 dark:stroke-white" />
        ),
      }}
      {...props}
    />
  );
}
Calendar.displayName = 'Calendar';

export { Calendar };
