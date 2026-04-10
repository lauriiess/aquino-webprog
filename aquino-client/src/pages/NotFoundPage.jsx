import React from 'react';
import Button from '../components/Button';

const NotFoundPage = () => {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <div className="relative mb-8">
        <h1 className="text-9xl font-black text-[#8E66B2]/10 select-none">
          404
        </h1>
        <p className="absolute inset-0 flex items-center justify-center text-4xl font-bold text-[#8E66B2]">
          Oops!
        </p>
      </div>

      <div className="max-w-md">
        <h2 className="text-2xl font-bold text-zinc-900 sm:text-3xl">
          This bloom hasn't grown yet.
        </h2>
        <p className="mt-4 text-base leading-7 text-zinc-600">
          The page you are looking for might have been moved, renamed, or perhaps it never existed in our garden. 
        </p>
      </div>

      <div className="mt-10 flex flex-col gap-4 sm:flex-row">
        <Button to="/">
          Return Home
        </Button>
        <Button to="/articles" className="bg-white !text-[#8E66B2] border-2 border-[#8E66B2]">
          Browse Articles
        </Button>
      </div>

      
    </div>
  );
};

export default NotFoundPage;