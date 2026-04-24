import { NavLink, Link } from 'react-router-dom';

const links = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Articles', to: '/articles' },
];

const navLinkClassName = ({ isActive }) =>
  [
    'rounded-full border-2 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] transition',
    isActive
      ? 'border-[#8E66B2] bg-[#8E66B2] text-[#FAE3E3]'
      : 'border-transparent text-[#8E66B2] hover:border-[#C98BB9] hover:bg-[#FAE3E3] hover:text-[#8E66B2]',
  ].join(' ');

const NavBar = () => {
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-[#FFDBEA]/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        
        <NavLink to="/" className="relative flex items-center gap-3">
          <div className="relative flex h-10 w-12 items-center justify-center">
             <img 
                src="/src/assets/logo.png" 
                alt="Logo" 
                className="absolute left-0 top-1/2 h-16 w-auto -translate-y-1/2 max-w-none" 
             />
          </div>
          
          <div className="pl-2">
            <p className="text-xl font-bold text-[#8E66B2]">Blossom & Vine</p>
          </div>
        </NavLink>

        <nav className="hidden items-center gap-2 md:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              className={navLinkClassName}
            >
              {link.label}
            </NavLink>
          ))}

          <Link
          to="/auth/signin"
          className="ml-5 rounded-full px-5 py-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#8E66B2] transition hover:bg-[#FAE3E3]"
        >
          Login
        </Link>
        </nav>
      </div>
    </header>
  );
};

export default NavBar;