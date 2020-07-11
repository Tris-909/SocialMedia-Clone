import React, { Component } from 'react'
import {Link} from 'react-router-dom';

// MUI stuff
import Appbar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';

import {connect} from 'react-redux';
import {logoutUser} from '../redux/actions/userAction';

import AddPost from './AddPost';
import Notifications from './Notifications';

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
                <Grid item container direction="row" align="center" justify="center">
                    <Grid item>
                        <Tooltip title="Profile" placement="bottom" component={Link} to={`/profile/${this.props.user.credentials.handle}`}>
                            <Button color="inherit"  style={{fontSize: '1.25rem'}}><i className="fas fa-user"></i></Button>
                        </Tooltip>
                    </Grid>
                    <Grid item>
                        <AddPost />
                    </Grid>
                    <Grid item>
                        <Notifications />
                    </Grid>
                </Grid>
                <Button color="inherit" component={Link} onClick={this.props.logoutUser} to="/login" edge="end">LogOut</Button>
            </React.Fragment>
        ) : 
        (
            <React.Fragment>
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

const mapStateToProps = (state) => ({
    user: state.user
});

const mapActionToProps = {
    logoutUser
} 

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(Navbar));
