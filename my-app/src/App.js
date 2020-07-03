import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import { MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import Navbar from './components/Navbar';
import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';

export const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#33c9dc',
      main: '#00bcd4',
      dark: '#008394',
      navbarColor: '#33312a',
      contrastText: '#fff'
    },
    secondary: {
      ligh: "#ff6333",
      main: "#ff3d00",
      dark: "#b22a00",
      contrastText: '#fff'  
    }
  },
  typography: {
    useNextVariants: true
  },
  overrides: {
    MuiAppBar: {
      colorPrimary: {
        backgroundColor: '#33312a'
      }
    }
  }
})

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <div className="App">
        <Router>
        <Navbar/>
          <div className="container">
            <Switch>
              <Route exact path="/" component={home} />
              <Route exact path="/login" component={login} />
              <Route exact path="/signup" component={signup} />
            </Switch>
          </div> 
        </Router>
    </div>
    </MuiThemeProvider>
  );
}

export default App;
