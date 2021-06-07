import React from 'react';

export const Navbar = ({ name }) => {
  return (
    <div className='navbar navbar-dark bg-dark mb-4'>
      <span className='navar-brand'>{name}</span>
      <button className='btn btn-danger'>
        <span className='fas fa-sign-out-alt'> Exit</span>
      </button>
    </div>
  );
};
