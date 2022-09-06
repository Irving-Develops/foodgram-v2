import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, NavLink } from 'react-router-dom';
import { login } from '../../store/session';
import DemoUser from './Demo';
import './Login.css'

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  let formattedErr = []

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      data.forEach(error =>  {
          let errors = error.split(": ")
          formattedErr.push(errors[1]) 
        })
        setErrors(formattedErr)
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to='/' />;
  }

  return (
    <div id="full-screen">
      <div id="login-container">
        <div id="login-image">
          <img src="https://www.instagram.com/static/images/homepage/phones/home-phones.png/1dc085cdb87d.png" alt="phone" />
          <img src="https://www.instagram.com/static/images/homepage/screenshots/screenshot4-2x.png/8e9224a71939.png" alt="kids balancing apples" />
        </div>
        <div id="login-form">
          <form onSubmit={onLogin} id="form">
            <div id="content">
              <h1>Foodgram</h1>
              <div className='errors'>
                {errors.map((error, ind) => (
                  <div key={ind}>{error}</div>
                ))}
              </div>
              <div className='input-field'>
                <input
                  name='email'
                  type='text'
                  placeholder='Email'
                  value={email}
                  onChange={updateEmail}
                  required
                />
              </div>
              <div className='input-field'>
                <input
                  name='password'
                  type='password'
                  placeholder='Password'
                  value={password}
                  onChange={updatePassword}
                  required
                />
              </div>
              <div className='button-blue'>
                <button type='submit'>Login</button>
                <h4>OR</h4>
                <DemoUser />
              </div>

            </div>
          </form>
          <div id="sign-up">
            <span>Dont have an account? <NavLink to='/sign-up'>sign up</NavLink></span>
          </div>
        </div>
      </div>
      <div id="footer">
        <div id='tech'>
          <span>Python</span>
          <span>Flask</span>
          <span>Javascript</span>
          <span>React</span>
          <span>Redux</span>
          <span>HTML5</span>
          <span>CSS3</span>
          <span>Heroku</span>
          <span>Amazon S3</span>    
        </div>
       <div id='login-links'>
          <a href='https://github.com/Irving-Develops' target='_blank'>github</a>
          <a href='https://www.linkedin.com/in/irving-arreola-palacios-5bb10414a/' target='_blank'>linkedin</a>
       </div>
      </div>

    </div>
  );
};

export default LoginForm;
