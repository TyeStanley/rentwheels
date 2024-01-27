import Image from 'next/image';

const UserMenu = () => {
  return (
    <div>
      <Image
        src="/userPlaceholder.jpg"
        alt="user button"
        width="44"
        height="44"
        className="rounded-full"
      />
    </div>
  );
};

export default UserMenu;
