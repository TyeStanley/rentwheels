'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

import { loginUser } from '@/lib/actions/user.actions';

const SignInForm = ({ closeForm }: { closeForm?: () => void }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    const user = await loginUser({ email, password });

    if (user?.error) {
      setError(user.error);
    } else {
      if (user?.username) {
        router.push(`/profile/${user.username}`);

        if (closeForm) {
          closeForm();
        }
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col dark:text-white">
      <label htmlFor="email" className="mt-3 flex flex-col">
        <span className="font-semibold">Email</span>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="mt-2.5 h-10 rounded bg-ps50 px-2 outline-none dark:bg-gray700"
        />
      </label>
      <label htmlFor="password" className="mt-8 flex flex-col">
        <span className="font-semibold">Password</span>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="mt-2.5 h-10 rounded bg-ps50 px-2 outline-none dark:bg-gray700"
        />
      </label>
      <span className="mt-5 h-5 text-xs text-red-500">{error}</span>

      <button
        type="submit"
        className="h-12 w-full rounded-lg bg-primary text-white dark:bg-primary"
      >
        Sign In
      </button>
    </form>
  );
};

export default SignInForm;
