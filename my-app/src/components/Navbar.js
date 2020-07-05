import React, { Component } from 'react'
import {Link} from 'react-router-dom';
// MUI stuff
import Appbar from '@material-ui/core/Appbar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';

import {connect} from 'react-redux';
import {logoutUser} from '../redux/actions/userAction';

const styles = {
    Authoziration: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    UnAuthorization: {
        display: 'flex',
        justifyContent: 'center'
    }
}

export class Navbar extends Component {
    render(props) {
        const {classes} = this.props;
        const content = this.props.token ? 
        (
            <React.Fragment>
                <Button color="inherit" component={Link} to="/" edge="start">Home</Button>
                <Button color="inherit" component={Link} onClick={this.props.logoutUser} to="/login" edge="end">LogOut</Button>
            </React.Fragment>
        ) : 
        (
            <React.Fragment>
                <Button color="inherit" component={Link} to="/">Home</Button>
                <Button color="inherit" component={Link} to="/login">Login</Button>
                <Button color="inherit" component={Link} to="/signup">SignUp</Button>
            </React.Fragment>
        );
        return (
            <Appbar position="fixed" >
                <Toolbar className={this.props.token ? classes.Authoziration : classes.UnAuthorization}>
                    {content}
                </Toolbar>
            </Appbar>
        )
    }
}

const mapActionToProps = {
    logoutUser
} 

export default connect(null, mapActionToProps)(withStyles(styles)(Navbar));
