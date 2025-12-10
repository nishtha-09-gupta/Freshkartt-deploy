import React, { useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { useLocation } from 'react-router-dom';

const Loading = () => {
  const { navigate } = useAppContext();
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const nextUrl = query.get('next');

  useEffect(() => {
    if (nextUrl) {
      setTimeout(() => {
        navigate(`/${nextUrl}`);
      }, 2000);
    }
  }, [nextUrl]);

  return (
    <div className="flex justify-center items-center h-screen bg-white">
      <div className="relative">
        <div className="h-20 w-20 border-4 border-[var(--color-primary-light)] border-t-[var(--color-primary)] rounded-full animate-spin"></div>
      </div>
    </div>
  );
};

export default Loading;
