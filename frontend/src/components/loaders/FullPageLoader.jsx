import React from 'react';

const FullPageLoader = () => {
  return (
    <div className='flex justify-center items-center h-screen'>
      <span className="loading loading-spinner loading-lg"></span>
    </div>
  );
};

export default FullPageLoader;
