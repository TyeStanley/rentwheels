'use client';

import { useState, FormEvent } from 'react';

import Button from '@/components/ui/button';
import { createUser } from '@/lib/actions/user.actions';
import { createUserErrors } from '@/types';

const SignUpForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<createUserErrors>({});
  const [createdUser, setCreatedUser] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const user = await createUser({ username, email, password });
    setErrors(user.errors);

    if (user.created) {
      setCreatedUser(user.created);
      setUsername('');
      setEmail('');
      setPassword('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col dark:text-white">
      <label htmlFor="username" className="mt-5 flex flex-col">
        <span className="font-semibold">Username</span>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="mt-2.5 h-10 rounded bg-ps50 px-2 outline-none dark:bg-gray700"
        />
        <span className="h-5 text-red-500">{errors.username}</span>
      </label>
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
        <span className="h-5 text-red-500">{errors.email}</span>
      </label>
      <label htmlFor="password" className="mt-5 flex flex-col">
        <span className="font-semibold">Password</span>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="mt-2.5 h-10 rounded bg-ps50 px-2 outline-none dark:bg-gray700"
        />
        <span className="h-5 text-red-500">{errors.password}</span>
      </label>
      <Button
        type="submit"
        variant="signInUp"
        className="mt-5"
        disabled={createdUser}
      >
        {createdUser ? 'Account Created' : 'Sign Up'}
      </Button>
    </form>
  );
};

export default SignUpForm;
