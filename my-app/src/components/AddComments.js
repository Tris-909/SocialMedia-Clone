import React, {Component} from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import SingleComment from './SingleComment';

import dayjs from 'dayjs';
import Picker from 'emoji-picker-react';

import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import {connect} from 'react-redux';
import {commentPost ,deleteComment ,getPost ,likeComment ,unlikeComment} from '../redux/actions/dataAction';

const styles = theme => ({ 
    userImage: {
        width: "2em", 
        height: '2em', 
        margin: '1em',
        [theme.breakpoints.down("xs")]: {
            marginTop: '20px',
            marginLeft: '20px',
            marginRight: '10px'
        }
    },
    Card: {
        paddingTop: '0.5em',        
        borderTopLeftRadius: "0px",
        borderTopRightRadius: "0px",  
        borderBottomLeftRadius: "0px",
        borderBottomRightRadius: "0px",
        boxShadow: 'none'
    },
    TextField: {
        margin: '1em',
        width: '100%'
    },
    EmojiButton: {
        paddingTop: '0px',
        fontSize: '2em',
        width: '100%',   
        border: '1px solid black',
        borderRadius: '0px',
        '&:hover': {
            backgroundColor: '#fff'
        }
    },
    DialogPaper: {
        minHeight: '80vh',
        maxHeight: '80vh'
    },
    TextFieldWidth: {
        width: '70%',
        [theme.breakpoints.down("xs")]: {
            width: '70%'
        },
        [theme.breakpoints.up("sm")]: {
            width: '70%'
        },
        [theme.breakpoints.up("md")]: {
            width: '85%'
        },
        [theme.breakpoints.up("lg")]: {
            width: '88%'
        }
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

export class AddComments extends Component {
    state = {
        comments: [],
        body: ''
    }
    
    // COMMENT INPUT 
    onChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const body = {
            body: this.state.body
        }
        this.props.commentPost(this.props.post.postID, body);
        this.props.getPost(this.props.post.postID);
        this.setState({body: ''});
    } 
    ////////////////////////////////////////////////////////////

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

    deleteComment = (postID, commentID) => {
        this.props.deleteComment(postID, commentID);
    }

    render() {
        const{classes} = this.props;
        let arr = [];
            for (var u = this.props.post.comments.length-1; u >= 0; u--) {
                arr.push(this.props.post.comments[u]);
                this.props.post.comments[u].compare = dayjs(this.props.post.comments[u].createdTime).unix();
            }
            let SortedArr = [];
            for (var i = 0; i < this.props.post.comments.length; i++) {
                if (i === 0) {
                    SortedArr.unshift(this.props.post.comments[0]);
                }
                if (i !== 0) {
                    if (this.props.post.comments[i].compare > SortedArr[0].compare) {
                        SortedArr.unshift(this.props.post.comments[i]);
                    } else {
                        let u = 0;
                        while ( u < SortedArr.length) {
                            if (this.props.post.comments[i].compare > SortedArr[u].compare) {
                                SortedArr.splice(u, 0, this.props.post.comments[i]);
                                break;
                            } else if (u === SortedArr.length-1 && this.props.post.comments[i].compare < SortedArr[u].compare) { 
                                console.log('push');
                                SortedArr.push(this.props.post.comments[i]);
                                break;
                            }
                            u++;
                        }
                    }
                }
            }
        let render;
        render = SortedArr.map(comment => {
            return ( <SingleComment key={comment.commentID} comment={comment} />);
        });
        
        
        return(
            <Dialog open={this.props.open} onClose={this.props.onClose} fullWidth maxWidth="md" style={{height: '90%'}}>
                <Grid item container style={{height: '100%'}}>
                <Grid item sm={12} style={{height: '100%', width: '100%'}}>
                <Card className={classes.Card} style={{borderBottom: '1px solid'}}>
                <Grid item container style={{width: "auto"}}>
                    <Grid item>
                        <Avatar alt="user avatar" src={this.props.credentials.imageUrl} className={classes.userImage} />
                    </Grid>
                    <Grid item className={classes.TextFieldWidth}>
                        <CssTextField 
                            name="body"
                            type="text"
                            label="Comment"
                            multiline
                            variant="outlined"
                            value={this.state.body}
                            onChange={this.onChange}
                            className={classes.TextField}
                            fullWidth
                        />
                    </Grid>
                    <Grid item container justify="space-between">  
                    <Grid item style={{width: '50%'}}>
                        <Button onClick={this.onEmojiOpen} className={classes.EmojiButton}>
                            <i style={{  margin: '0.5em'}} className="far fa-smile-beam"></i>
                        </Button>  
                    </Grid>
                    <Grid item style={{width: '50%'}}>
                        <Button onClick={this.handleSubmit} className={classes.EmojiButton}>
                            <i style={{  margin: '0.5em'}} className="far fa-paper-plane"></i>
                        </Button>
                    </Grid>
                    {this.state.openEmoji ? (
                        <Dialog open={this.state.openEmoji} onClose={this.onEmojiClose}>
                            <Picker onEmojiClick={this.onEmojiCLick} disableSearchBar disableSkinTonePicker /> 
                        </Dialog>) : null}
                    </Grid>
                </Grid>
                </Card>
                {render !== undefined ? render : null}
                </Grid>
                </Grid>
            </Dialog>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.user,
    post: state.data.post,
    loading: state.UI.loading
})

const mapActionToProps = {
    commentPost,
    deleteComment,
    getPost,
    likeComment,
    unlikeComment
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(AddComments));