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
  const baseStyles = 'py-4 px-6 rounded-lg transition-colors duration-200 font-bold text-sm lg:text-base ';
  
  const variants = {
    primary: 'bg-blue-500 hover:bg-blue-600 text-white',
    secondary: 'bg-gray-600 hover:bg-gray-700 text-white sm:w-full',
    outline: 'border border-gray-500 hover:bg-gray-50 text-gray-500'
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