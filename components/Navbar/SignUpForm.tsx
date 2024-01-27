'use client';

import { useState, FormEvent } from 'react';

const SignUpForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle form submission here
    console.log(
      `Username: ${username}, Email: ${email}, Password: ${password}`
    );
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
      </label>
      <label htmlFor="email" className="mt-5 flex flex-col">
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
      </label>
      <button
        type="submit"
        className="mt-10 h-12 w-full rounded-lg bg-primary text-white dark:bg-primary"
      >
        Sign Up
      </button>
    </form>
  );
};

export default SignUpForm;
