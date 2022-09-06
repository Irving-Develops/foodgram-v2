import React, {useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Redirect, NavLink } from 'react-router-dom';
import { signUp } from '../../store/session';
import './Signup.css'

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [full_name, setFullName] = useState('')
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [profile_pic, setProfilePic] = useState('')
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  // const [isDisabled, setIsDisabled] = useState(true)
  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();
  
  // console.log(isDisabled)
  // useEffect(() => {
  //   if (username.length && username.length < 255 &&
  //       full_name.length > 4 && full_name.length < 50 &&
  //       email.length > 6 && email.length < 255 &&
  //       password.length >=4 && password.length < 255 &&
  //       repeatPassword.length >=4 && repeatPassword.length < 255){

  //         setIsDisabled(false)
  //       }
  // }, [username, full_name, email, password])

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(full_name, email, username, profile_pic, password));
      let formattedErr = []
      if (data) { 
        data.forEach(error =>  {
          let errors = error.split(": ")
          formattedErr.push(errors[1]) 
        })
        setErrors(formattedErr)
      }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };
  
  const updateFullName= (e) => {
    setFullName(e.target.value);
  }

  // const updateProfilePicture = (e) => {
  //   setProfilePic(e.target.value);
  // }

  if (user) {
    return <Redirect to='/' />;
  }

  // const updateDisable = () => {
  // }

  return (
    <div id='full-screen'>
      <div id="entire-container">
        <div id="signup-container">
          <div id="signup-header">
            <h1>Foodgram</h1>
            <h2>Sign up to see photos from your friends</h2>
          </div>
          <form onSubmit={onSignUp} id="signup-form">
            <div className='errors'>
              <p>All fields required *</p>
              {errors.map((error, ind) => (
                <div key={ind}>{error}</div>
              ))}
            </div>
            <div className='input'>
              <input
                type='text'
                name='email'
                onChange={updateEmail}
                placeholder='Email'
                value={email}
                required
              ></input>
            </div>
            <div className='input'>
              <input
                type='text'
                name='full_name'
                placeholder='Full Name'
                onChange={updateFullName}
                value={full_name}
                required
              ></input>
            </div>
            <div className='input'>
              <input
                type='text'
                name='username'
                placeholder='Username'
                onChange={updateUsername}
                value={username}
                required
              ></input>
            </div>
            {/* <div>
              <label>Profile Picture</label>
              <input
                type='text'
                name='profile_pic'
                onChange={updateProfilePicture}
                value={profile_pic}
              ></input>
            </div> */}
            <div className='input'>
              <input
                type='password'
                name='password'
                placeholder='Password'
                onChange={updatePassword}
                value={password}
              ></input>
            </div>
            <div className='input'>
              <input
                type='password'
                name='repeat_password'
                placeholder='Repeat Password'
                onChange={updateRepeatPassword}
                value={repeatPassword}
                required={true}
              ></input>
            </div>
            <div className='button-blue'>
              <button type='submit' >Sign Up</button>
            </div>
          </form>
      </div>
          <div id="login">
            <span>Have an account? <NavLink to='/login'>Log in</NavLink></span>
          </div>
      </div>
    </div>
  );
};

export default SignUpForm;
