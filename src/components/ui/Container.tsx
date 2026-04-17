import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  narrow?: boolean;
}

const Container: React.FC<ContainerProps> = ({ children, className = '', narrow = false }) => (
  <div className={`mx-auto w-full px-5 sm:px-8 md:px-12 ${narrow ? 'max-w-4xl' : 'max-w-7xl'} ${className}`}>
    {children}
  </div>
);

export default Container;
