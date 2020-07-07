import React, { Component } from 'react'

import withStyles from '@material-ui/core/styles/withStyles';

import {connect} from 'react-redux';
import {editUserDetails} from '../redux/actions/userAction';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const styles = {
    buttonLayout: {
        display: 'flex',
        justifyContent: "space-between"
    },
    DialogButton: {
        margin: '1em'
    },
    TextField: {
        marginTop: '1em',
        marginBottom: '1em'
    },
    Bio: {
        marginTop: '1em',
        marginBottom: '1em',
    },
    Birth: {
        marginTop: '1em',
        marginBottom: '1em',
        marginLeft: '1em'
    }
};

export class EditDetails extends Component {
    state = {
        bio: '',
        website: '',
        insta: '',
        linkedIn: '',
        open: false,
        birth: ''
    };

    mapUserDetailsToState = (credentials) => {
        this.setState({
            bio: credentials.bio ? credentials.bio : '',
            website: credentials.website ? credentials.website : '',
            insta: credentials.insta ? credentials.insta : '',
            linkedIn: credentials.linkedIn ? credentials.linkedIn : '',
            birth: credentials.birth ? credentials.birth : ''
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
            linkedIn: this.state.linkedIn,
            birth: this.state.birth
        };
        console.log(this.props);
        this.props.editUserDetails(userDetails);
        this.handleClose();
    }

    render() {
        const {classes} = this.props;
        return (
            <React.Fragment>
                    <Button onClick={this.handleOpen} className={classes.button}>
                        Edit Details
                    </Button>
                <Dialog open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="md" >
                    <DialogTitle>Edit your details</DialogTitle>
                    <DialogContent>
                        <form>
                            <Grid container direction="row">
                            <Grid item style={{width: '50%'}}>
                            <TextField 
                                name="bio"
                                type="text"
                                label="Bio"
                                multiline
                                rows="3"
                                variant="outlined"
                                placeholder="Your Bio"
                                className={classes.Bio}
                                value={this.state.bio}
                                onChange={this.onChange}
                                fullWidth
                            />
                            </Grid>
                            <Grid item container justify="center" style={{width: '50%', margin: 'auto'}}>
                            <TextField 
                                name="birth"
                                type="text"
                                label="Birthday"
                                variant="outlined"
                                placeholder="Your Birthday"
                                value={this.state.birth}
                                onChange={this.onChange}
                            />
                            </Grid>
                            </Grid>

                            <TextField 
                            name="website"
                            type="text"
                            label="Facebook"
                            variant="outlined"
                            placeholder="Your Facebook"
                            className={classes.TextField}
                            value={this.state.website}
                            onChange={this.onChange}
                            fullWidth/>

                            <TextField 
                            name="insta"
                            type="text"
                            label="Instagram"
                            variant="outlined"
                            placeholder="Your Instagram"
                            className={classes.TextField}
                            value={this.state.insta}
                            onChange={this.onChange}
                            fullWidth/>

                            <TextField 
                            name="linkedIn"
                            type="text"
                            label="LinkedIn"
                            variant="outlined"
                            placeholder="Your LinkedIn"
                            className={classes.TextField}
                            value={this.state.linkedIn}
                            onChange={this.onChange}
                            fullWidth/>
                        </form>
                    </DialogContent>
                    <DialogActions className={classes.buttonLayout}>
                        <Button onClick={this.handleClose} className={classes.DialogButton}>
                            Cancel
                        </Button>
                        <Button onClick={this.handleSubmit} className={classes.DialogButton}>
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
