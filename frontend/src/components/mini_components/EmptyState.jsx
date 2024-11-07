import React from 'react';
import { Frown } from 'lucide-react';
import Link from 'next/link';
import { Button } from '../ui/button';

const EmptyState = ({ 
  icon: Icon = Frown, 
  title, 
  message,
  buttonText, 
  link 
}) => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-10 px-4 bg-[#111] rounded-md shadow-md w-full">
      <div className="mb-4">
        <Icon className="w-12 h-12 text-gray-400" />
      </div>
      <h2 className="text-2xl font-semibold text-white mb-2">{title}</h2>
      <p className="text-gray-500 mb-4">{message}</p>
      {buttonText && link && (
         <Button asChild variant="primary" className="bg-[#cf0] md:px-8 px-12 py-2">
        <Link 
          href={link} 
          className='body font-semibold text-[#111]'
        >
          {buttonText}
        </Link>
     </Button>
      )}
    </div>
  );
};

export default EmptyState;
