const Cross = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      className={className}
    >
      <path
        d="M0 2C0 0.89543 0.895431 0 2 0H22C23.1046 0 24 0.895431 24 2V24H0V2Z"
        className="fill-white dark:fill-gray850"
      />
      <path
        d="M17.2286 6.77145C17.0333 6.57618 16.7167 6.57618 16.5214 6.77145L12 11.2929L7.47855 6.77145C7.28329 6.57618 6.96671 6.57618 6.77145 6.77145C6.57618 6.96671 6.57618 7.28329 6.77145 7.47855L11.2929 12L6.77145 16.5214C6.57618 16.7167 6.57618 17.0333 6.77145 17.2286C6.96671 17.4238 7.28329 17.4238 7.47855 17.2286L12 12.7071L16.5214 17.2286C16.7167 17.4238 17.0333 17.4238 17.2286 17.2286C17.4238 17.0333 17.4238 16.7167 17.2286 16.5214L12.7071 12L17.2286 7.47855C17.4238 7.28329 17.4238 6.96671 17.2286 6.77145Z"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="stroke-gray800 dark:stroke-white200"
      />
    </svg>
  );
};

export default Cross;
