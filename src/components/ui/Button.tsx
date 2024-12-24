import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  fullWidthOnAllScreens?: boolean;
  responsiveFullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  fullWidthOnAllScreens = false,
  responsiveFullWidth = false,
  className = '',
  ...props
}) => {
  const baseStyles = 'rounded-lg transition-colors duration-200 font-bold text-sm lg:text-base ';
  
  const variants = {
    primary: 'bg-gray-600 hover:bg-gray-700 text-white sm:w-full py-4 px-6',
    secondary: 'bg-white text-gray-500',
    outline: 'border border-gray-500 hover:bg-gray-50 text-gray-500 py-4 px-6'
  };

  const widthStyles = fullWidthOnAllScreens
    ? 'w-full'
    : responsiveFullWidth
    ? 'w-full sm:w-auto' 
    : '';

  return (
    <button
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${widthStyles}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};