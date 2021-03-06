import React from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch} from 'react-router-dom';
import './App.css';
import themeFile from './Utilites/theme';
import jwtDecode from 'jwt-decode';

import Navbar from './components/Navbar/Navbar';
import AuthRoute from './Utilites/AuthRoute';

import {Provider} from 'react-redux';
import store from './redux/store';

import { MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';
import profile from './pages/profile';
import chat from './pages/chat';

import {SET_AUTHENTICATED} from './redux/types';
import {logoutUser, getUserData} from './redux/actions/userAction';
import axios from 'axios';

export const theme = createMuiTheme(themeFile);

axios.defaults.baseURL = 'https://asia-east2-socialapp-2c8b0.cloudfunctions.net/api';

const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUser());
    window.location.href="/login";
  } else {
    store.dispatch({type: SET_AUTHENTICATED});
    axios.defaults.headers.common['Authorization'] = token;
    store.dispatch(getUserData());
  }
} 


function App() {
  const redirect = token ? (
    <Route exact path="/" component={home} />
  ) : (<Redirect from='/' to='/login' />);

  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <Router>
        <Navbar token={token}/>
          <div className="container">
            <Switch>
              <AuthRoute exact path="/login" component={login} />
              <AuthRoute exact path="/signup" component={signup} />
              {redirect}
              <Route exact path="/profile/:handle" component={profile} />
              <Route exact path="/chat" component={chat} />
              <Route exact path="/profile/:handle/post/:postID" component={profile} />
            </Switch>
          </div> 
        </Router>
    </Provider>
    </MuiThemeProvider>
  );
}

export default App;
