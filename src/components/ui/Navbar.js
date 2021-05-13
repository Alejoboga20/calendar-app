import React from 'react';

export const Navbar = () => {
  return (
    <div className='navbar navbar-dark bg-dark mb-4'>
      <span className='navar-brand'>Alejo</span>
      <button className='btn btn-danger'>
        <span className='fas fa-sign-out-alt'> Exit</span>
      </button>
    </div>
  );
};
