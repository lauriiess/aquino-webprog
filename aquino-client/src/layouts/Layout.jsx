import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

const Layout = () => {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-50">
      <NavBar />
      
      <main className="flex-grow pt-24">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default Layout;