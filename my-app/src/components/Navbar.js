import React, { Component } from 'react'
import {Link} from 'react-router-dom';
// MUI stuff
import Appbar from '@material-ui/core/Appbar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';

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
                <Grid item container direction="row" align="center" justify="center">
                    <Grid item>
                        <Tooltip title="Profile" placement="bottom">
                            <Button color="inherit"><i className="fas fa-user"></i></Button>
                        </Tooltip>
                    </Grid>
                    <Grid item>
                        <Tooltip title="Add a post" placement="bottom">
                            <Button color="inherit"><i className="fas fa-plus"></i></Button>
                        </Tooltip>
                    </Grid>
                    <Grid item>
                        <Tooltip title="Notifications" placement="bottom">
                            <Button color="inherit"><i className="fas fa-bell"></i></Button>
                        </Tooltip>
                    </Grid>
                </Grid>
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
