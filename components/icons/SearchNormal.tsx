const SearchNormal = ({ className }: { className?: string }) => {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className || 'stroke-white'}
    >
      <path
        d="M6.70817 12.25C9.76875 12.25 12.2498 9.76893 12.2498 6.70835C12.2498 3.64778 9.76875 1.16669 6.70817 1.16669C3.64759 1.16669 1.1665 3.64778 1.1665 6.70835C1.1665 9.76893 3.64759 12.25 6.70817 12.25Z"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.8332 12.8334L11.6665 11.6667"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default SearchNormal;
