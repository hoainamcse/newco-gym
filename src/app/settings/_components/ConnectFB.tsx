'use client';

import React from 'react';

const ConnectFB: React.FC = () => {
  const connectFacebook = () => {
    // Add your logic to connect to Facebook
    alert('Connect to Facebook functionality is not yet implemented');
  };

  return (
    <div className="mb-8">
      <button onClick={connectFacebook} className="bg-blue-400 text-white px-4 py-2 rounded-md" disabled>
        Connected to Facebook
      </button>
    </div>
  );
};

export default ConnectFB;
