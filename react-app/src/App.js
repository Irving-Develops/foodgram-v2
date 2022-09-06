import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { authenticate } from './store/session';
import AllPosts from './components/Posts/AllPosts';
import User from './components/User/User'
import Search from './components/Search/search';
import Chatrooms from './components/Chat/AllChatrooms';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async() => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/' exact={true} >
          <NavBar />
          <AllPosts />
        </ProtectedRoute>
        {/* <ProtectedRoute path='/posts' exact={true} >
          <NavBar />
          <Explore />
        </ProtectedRoute> */}
        <ProtectedRoute path='/users/:userId' exact>
            <NavBar />
            <User />
        </ProtectedRoute>
        <ProtectedRoute path='/messages' exact={true} >
          <NavBar />
          <Chatrooms />
        </ProtectedRoute>
        <ProtectedRoute path='/messages/:chatroomId' exact={true} >
          <NavBar />
          <Chatrooms />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
