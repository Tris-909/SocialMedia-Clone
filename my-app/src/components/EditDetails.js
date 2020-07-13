import React, { Component } from 'react'

import Picker from 'emoji-picker-react';

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

import Tooltip from '@material-ui/core/Tooltip';

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
    },
    EmojiButton: {
        fontSize: '2em',
        marginLeft: '1em'
    }
};

const CssTextField = withStyles({
    root: {
      '& label.Mui-focused': {
        color: '#33312a',
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: '#33312a',
      },
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: '#33312a',
        },
        '&:hover fieldset': {
          borderColor: '#33312a',
        },
        '&.Mui-focused fieldset': {
          borderColor: '#33312a',
        },
      },
    },
  })(TextField);

export class EditDetails extends Component {
    state = {
        bio: '',
        website: '',
        insta: '',
        linkedIn: '',
        open: false,
        birth: '',
        openEmoji: false
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

    onEmojiOpen = () => {
        this.setState({
            openEmoji: true
        });
    }

    onEmojiClose = () => {
        this.setState({
            openEmoji: false
        });
    }

    onEmojiCLick = (event, emojiObject) => {
        const {bio} = this.state;
        const text = `${bio}${emojiObject.emoji}`;
        this.setState({
            bio: text       
        });
    }

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
                    <Grid>
                        <DialogTitle>Edit your details</DialogTitle>
                    </Grid>
                    <DialogContent>
                    {this.state.openEmoji ? (
                    <Dialog open={this.state.openEmoji} onClose={this.onEmojiClose}>
                        <Picker onEmojiClick={this.onEmojiCLick} disableSearchBar disableSkinTonePicker /> 
                    </Dialog>) : null}
                        <form>
                            <Grid container direction="row">
                            <Grid item style={{width: '50%'}}>
                            <CssTextField 
                                name="bio"
                                type="text"
                                label="Bio"
                                multiline
                                rows="2"
                                variant="outlined"
                                placeholder="Your Bio"
                                className={classes.Bio}
                                value={this.state.bio}
                                onChange={this.onChange}
                                fullWidth
                            />
                            </Grid>
                            <Grid item container justify="center" style={{width: '50%', margin: 'auto'}}>
                            <Grid item>
                                <CssTextField 
                                    name="birth"
                                    type="text"
                                    label="Birthday"
                                    variant="outlined"
                                    placeholder="Your Birthday"
                                    value={this.state.birth}
                                    onChange={this.onChange}
                                />
                            </Grid>
                            <Grid item>
                                <Tooltip title="Emoji for Bio" placement="bottom"> 
                                <Button onClick={this.onEmojiOpen} className={classes.EmojiButton}>
                                    <i className="far fa-smile-beam"></i>
                                </Button>  
                                </Tooltip>
                            </Grid>
                            </Grid>
                            </Grid>

                            <CssTextField 
                            name="website"
                            type="text"
                            label="Facebook"
                            variant="outlined"
                            placeholder="Your Facebook"
                            className={classes.TextField}
                            value={this.state.website}
                            onChange={this.onChange}
                            fullWidth/>

                            <CssTextField 
                            name="insta"
                            type="text"
                            label="Instagram"
                            variant="outlined"
                            placeholder="Your Instagram"
                            className={classes.TextField}
                            value={this.state.insta}
                            onChange={this.onChange}
                            fullWidth/>

                            <CssTextField 
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
