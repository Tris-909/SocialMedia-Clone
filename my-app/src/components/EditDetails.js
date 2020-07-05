import React, { Component } from 'react'

import withStyles from '@material-ui/core/styles/withStyles';

import {connect} from 'react-redux';
import {editUserDetails} from '../redux/actions/userAction';

import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';

const styles = {
};

export class EditDetails extends Component {
    state = {
        bio: '',
        website: '',
        insta: '',
        linkedIn: '',
        open: false
    };

    mapUserDetailsToState = (credentials) => {
        this.setState({
            bio: credentials.bio ? credentials.bio : '',
            website: credentials.website ? credentials.website : '',
            insta: credentials.insta ? credentials.insta : '',
            linkedIn: credentials.linkedIn ? credentials.linkedIn : ''
        });
    };

    handleOpen = () => {
        this.setState({open: true});
        this.mapUserDetailsToState(this.props.credentials);
    }

    handleClose = () => {
        this.setState({open: false});
    }

    componentDidMount() {
        const {credentials} = this.props;
        this.mapUserDetailsToState(credentials);
    }

    onChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit = () => {
        const userDetails = {
            bio: this.state.bio,
            website: this.state.website,
            insta: this.state.insta,
            linkedIn: this.state.linkedIn
        };
        console.log(userDetails);
        this.props.editUserDetails(userDetails);
        this.handleClose();
    }

    render() {
        const {classes} = this.props;
        return (
            <React.Fragment>
                <Tooltip title="Edit details" placement="right-end">
                    <IconButton onClick={this.handleOpen} className={classes.button}>
                        <i className="fas fa-user-edit"></i>
                    </IconButton>
                </Tooltip> 
                <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="md" >
                    <DialogTitle>Edit your details</DialogTitle>
                    <DialogContent>
                        <form>
                            <TextField 
                            name="bio"
                            type="text"
                            label="Bio"
                            multiline
                            rows="3"
                            placeholder="Your Bio"
                            className={classes.TextField}
                            value={this.state.bio}
                            onChange={this.onChange}
                            fullWidth/>

                            <TextField 
                            name="website"
                            type="text"
                            label="Facebook"
                            placeholder="Your Facebook"
                            className={classes.TextField}
                            value={this.state.website}
                            onChange={this.onChange}
                            fullWidth/>

                            <TextField 
                            name="insta"
                            type="text"
                            label="Instagram"
                            placeholder="Your Instagram"
                            className={classes.TextField}
                            value={this.state.insta}
                            onChange={this.onChange}
                            fullWidth/>

                            <TextField 
                            name="linkedIn"
                            type="text"
                            label="LinkedIn"
                            placeholder="Your LinkedIn"
                            className={classes.TextField}
                            value={this.state.linkedIn}
                            onChange={this.onChange}
                            fullWidth/>
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} >
                            Cancel
                        </Button>
                        <Button onClick={this.handleSubmit}>
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    credentials: state.user.credentials
})

const mapActionToProps = {
    editUserDetails
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(EditDetails));
