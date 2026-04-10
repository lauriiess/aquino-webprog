import { Link } from 'react-router-dom';

const variantClasses = {
  primary: 'border-[#8E66B2] bg-[#8E66B2] text-[#FAE3E3]',
  secondary: ' text-[#8E66B2] hover:border-[#C98BB9] hover:bg-[#FAE3E3] hover:text-[#8E66B2]',
};

const Button = ({
  children,
  to,
  type = 'button',
  variant = 'secondary',
  className = '',
}) => {
  const classes = [
    'inline-flex items-center justify-center rounded-full border-2 border-[#8E66B2]-200 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.24em] transition',
    variantClasses[variant] ?? variantClasses.secondary,
    className,
  ]
    .join(' ')
    .trim();

  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes}>
      {children}
    </button>
  );
};

export default Button;