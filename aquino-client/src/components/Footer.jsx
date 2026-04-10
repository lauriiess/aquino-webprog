import React from 'react';
import { NavLink } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="mt-auto border-t-2 border-[#F8C8DC] bg-[#8E66B2] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center gap-2">
             
              <p className="text-xl font-bold tracking-tight text-[#F8C8DC]">
                Blossom & Vine
              </p>
            </div>
            <p className="mt-2 text-sm text-[#F8C8DC]/80">
              Cultivating beauty through floral design.
            </p>
          </div>

          <div className="text-center md:text-right">
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#F8C8DC]">
              © 2026 Blossom & Vine
            </p>
            <p className="mt-1 text-[10px] text-[#F8C8DC]/60">
              Quezon City, Philippines
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;  