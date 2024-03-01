const SteeringWheel = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="size-3.5 lg:size-6"
    >
      <g id="Car">
        <path
          id="Circle 4"
          d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.53 2 12 2Z"
          fill="#90A3BF"
        />
        <rect
          id="Circle 3"
          x="4"
          y="4"
          width="16"
          height="16"
          rx="8"
          className="fill-white dark:fill-gray850"
        />
        <path
          id="Circle 2"
          d="M12 6C8.688 6 6 8.688 6 12C6 15.312 8.688 18 12 18C15.312 18 18 15.312 18 12C18 8.688 15.318 6 12 6Z"
          fill="#90A3BF"
        />
        <rect
          id="Circle 1"
          x="8"
          y="8"
          width="8"
          height="8"
          rx="4"
          className="fill-white dark:fill-gray850"
        />
        <rect
          id="Rectangle 3"
          x="11"
          y="17"
          width="2"
          height="4"
          fill="#90A3BF"
        />
        <rect
          id="Rectangle 2"
          x="17"
          y="11"
          width="4"
          height="2"
          fill="#90A3BF"
        />
        <rect
          id="Rectangle 1"
          x="3"
          y="11"
          width="4"
          height="2"
          fill="#90A3BF"
        />
      </g>
    </svg>
  );
};

export default SteeringWheel;