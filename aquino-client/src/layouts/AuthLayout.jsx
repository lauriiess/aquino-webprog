import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <section className="min-h-screen bg-zinc-100 text-zinc-900">
      <div className="grid min-h-screen w-full lg:grid-cols-[1fr_0.95fr]">
<div 
          className="flex items-center justify-center border-b-2 border-zinc-300 bg-cover bg-center p-8 sm:p-10 lg:border-b-0 lg:border-r-2 lg:border-zinc-300 lg:p-16"
          style={{ backgroundImage: "url('https://m.media-amazon.com/images/S/assets.wholefoodsmarket.com//content/d5/ca/9600252644399075979acf20df7e/how-to-arrange-flowers-like-a-pro-hero.jpg')" }}
        >          <div className="flex w-full max-w-md items-center justify-center rounded-[2rem]  bg-[#8E66B2]/40 p-8 sm:p-10">
            <div className="relative aspect-square w-full max-w-[18rem] flex items-center justify-center">
              <img 
                src="/src/assets/logo.png" 
                alt="Logo" 
                className="h-full w-full object-contain p-4" 
              />
            </div>
          </div>
        </div>
        <main className="flex items-center bg-zinc-50 px-6 py-10 sm:px-10 lg:px-16">
          <div className="mx-auto w-full max-w-md">
            <Outlet />
          </div>
        </main>
      </div>
    </section>
  );
};

export default AuthLayout;