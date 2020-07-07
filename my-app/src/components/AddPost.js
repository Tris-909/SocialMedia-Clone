import React, { Component } from 'react'

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';

import {connect} from 'react-redux';
import {postOnePost} from '../redux/actions/dataAction';


const styles = {
    body: {
        margin: '1em'
    },
    post: {
        fontSize: '1.5rem',
        borderRadius: '2px solid #33312a'
    }
}

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
        loading: false
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
        this.handleClickClose();
    }
    render() {
        const {classes} = this.props;
        return (
            <React.Fragment>
            <Tooltip title="Add a post" placement="bottom">
                <Button color="inherit" onClick={this.handleClickOpen}><i className="fas fa-plus"></i></Button>      
            </Tooltip>
            <Dialog open={this.state.open} onClose={this.handleClickClose} fullWidth maxWidth="md">
                <DialogTitle>What is on your mind ?</DialogTitle>
                <DialogContent>
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
                        <Button onClick={this.handleSubmit} style={{fontSize: '1.5rem', border:  '3px solid #33312a', width: '20%'}}>POST</Button>
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
