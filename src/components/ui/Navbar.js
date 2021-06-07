import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startLogout } from '../../actions/auth';

export const Navbar = () => {
  const dispatch = useDispatch();

  const { name } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(startLogout());
  };

  return (
    <div className='navbar navbar-dark bg-dark mb-4'>
      <span className='navar-brand'>{name}</span>
      <button className='btn btn-danger'>
        <span className='fas fa-sign-out-alt' onClick={handleLogout}>
          {' '}
          Exit
        </span>
      </button>
    </div>
  );
};
