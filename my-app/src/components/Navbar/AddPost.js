import React, { Component } from 'react'

//** NPM PACKAGES */
import Picker from 'emoji-picker-react';

//** MATERIAL-UI */
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';

//** REDUX STORE */
import {connect} from 'react-redux';
import {postOnePost} from '../../redux/actions/dataAction';

const styles = theme => ({
    body: {
        margin: '1em'
    },
    post: {
        fontSize: '1.5rem',
        borderRadius: '2px solid #33312a'
    },
    EmojiButton: {
        fontSize: '2em'
    },
    PostButton: {
        fontSize: '1.5rem', 
        border:  '3px solid #33312a',
        width: '20%',
        [theme.breakpoints.down("xs")]: {
            width: '45%'
        }
    },
    DialogTitle: {
        paddingLeft: '8px',
        paddingRight: '0px'
    }
});

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

export class AddPost extends Component {
    state = {
        body: '',
        open: false,
        loading: false,
        openEmoji: false,
        chosenEmoji: null
    }

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
        const {body} = this.state;
        const text = `${body}${emojiObject.emoji}`;
        this.setState({
            body: text       
        });
    }

    handleClickOpen = () => {
        this.setState({open: true});
    }

    handleClickClose = () => {
        this.setState({open: false});
    }

    onChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const newPost = {
            body: this.state.body
        }
        this.props.postOnePost(newPost);
        this.setState({body: ''});
        this.handleClickClose();
    }

    render() {
        const {classes} = this.props;
        return (
            <React.Fragment>
            <Tooltip title="Add a post" placement="bottom">
                <Button color="inherit" style={{fontSize: '1.25rem'}} onClick={this.handleClickOpen}><i className="fas fa-plus"></i></Button>      
            </Tooltip>
            <Dialog disableScrollLock={true}  open={this.state.open} onClose={this.handleClickClose} fullWidth maxWidth="md">
                <Grid container justify="space-between">
                <DialogTitle className={classes.DialogTitle}>What is on your mind ?</DialogTitle>
                    <Button onClick={this.onEmojiOpen} className={classes.EmojiButton}>
                        <i className="far fa-smile-beam"></i>
                    </Button>  
                </Grid>
                <DialogContent>
                    {this.state.openEmoji ? (
                    <Dialog open={this.state.openEmoji} onClose={this.onEmojiClose}>
                        <Picker onEmojiClick={this.onEmojiCLick} disableSearchBar disableSkinTonePicker /> 
                    </Dialog>) : null}
                    <form>
                    <CssTextField 
                        name="body"
                        type="text"
                        label="Your Post"
                        multiline
                        rows="5"
                        variant="outlined"
                        placeholder="Add something"
                        value={this.state.body}
                        onChange={this.onChange}
                        fullWidth
                    />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Grid container justify="center" align="center">
                        <Button onClick={this.handleSubmit} className={classes.PostButton}>POST</Button>
                    </Grid>
                </DialogActions>
            </Dialog>
            </React.Fragment>
        )
    }
}

const mapActionToProps = {
    postOnePost
}

export default connect(null, mapActionToProps)(withStyles(styles)(AddPost));
