import React from 'react';
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  children: React.ReactNode;
}
const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  children,
  className,
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4c146c] dark:focus:ring-[#b083f7] disabled:opacity-50 disabled:pointer-events-none';
  const variants = {
    primary: 'bg-[#4c146c] text-white hover:bg-[#b083f7] active:bg-[#4c146c] dark:bg-[#4c146c] dark:hover:bg-[#6a1b99]',
    secondary: 'bg-[#b083f7] text-white hover:bg-opacity-90 active:bg-opacity-100 dark:bg-[#b083f7] dark:hover:bg-opacity-80',
    outline: 'bg-transparent border border-[#4c146c] text-[#4c146c] hover:bg-[#4c146c] hover:text-white dark:border-[#b083f7] dark:text-[#b083f7] dark:hover:bg-[#b083f7] dark:hover:bg-opacity-20',
    ghost: 'bg-transparent text-[#4c146c] hover:bg-[#4c146c] hover:bg-opacity-10 dark:text-[#b083f7] dark:hover:bg-[#b083f7] dark:hover:bg-opacity-10'
  };
  const sizes = {
    sm: 'text-sm px-3 py-1.5',
    md: 'text-base px-4 py-2',
    lg: 'text-lg px-6 py-3'
  };
  const widthClass = fullWidth ? 'w-full' : '';
  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${widthClass} ${className || ''}`;
  return <button className={classes} {...props}>
      {children}
    </button>;
};
export default Button;