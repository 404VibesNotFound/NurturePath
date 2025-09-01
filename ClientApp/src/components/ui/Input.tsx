import React, { forwardRef } from 'react';
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}
const Input = forwardRef<HTMLInputElement, InputProps>(({
  label,
  error,
  fullWidth = false,
  className,
  ...props
}, ref) => {
  const inputClasses = `
      px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#4c146c] dark:focus:ring-[#b083f7]
      ${error ? 'border-[#e53e3e]' : 'border-gray-300 dark:border-gray-600'} 
      ${fullWidth ? 'w-full' : ''} 
      ${className || ''}
      dark:bg-gray-700 dark:text-white
    `;
  return <div className={`${fullWidth ? 'w-full' : ''} mb-4`}>
        {label && <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
            {label}
          </label>}
        <input ref={ref} className={inputClasses} {...props} />
        {error && <p className="mt-1 text-sm text-[#e53e3e]">{error}</p>}
      </div>;
});
Input.displayName = 'Input';
export default Input;