import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';

const LogoutButton = () => {
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(logout());
  };
  return <img style={{"width": "26px", "marginBottom": "3px"}}onClick={onLogout} src="https://www.svgrepo.com/show/325354/log-out.svg" alt="log out"/>
  // return <button onClick={onLogout}>Log Out</button>;
};

export default LogoutButton;
