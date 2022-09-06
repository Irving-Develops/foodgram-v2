import React from 'react';
import { demoLogin } from '../../store/session';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const DemoUser = () => {
  const dispatch = useDispatch();

  const handleDemoLogin = async (e) => {
    e.preventDefault()
    return dispatch(demoLogin())
  }

  return (
    <NavLink to='/' onClick={handleDemoLogin}>Log in with Demo User </NavLink>
  );
}

export default DemoUser;