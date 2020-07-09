import React, {Component} from 'react';
import withStyles from '@material-ui/core/styles/withStyles';

import dayjs from 'dayjs';
import Picker from 'emoji-picker-react';

import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {Link} from 'react-router-dom';
import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import {connect} from 'react-redux';
import {commentPost} from '../redux/actions/dataAction';

const styles = {
    userImage: {
        width: "2em", 
        height: '2em', 
        margin: '1em'
    },
    Card: {
        paddingTop: '0.5em',
        paddingBottom: '0.5em',
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
        marginTop: '1em',
        marginBottom: '1em',
        paddingTop: '0px',
        fontSize: '2em',
        '&:hover': {
            backgroundColor: '#fff'
        }
    },
    DialogPaper: {
        minHeight: '80vh',
        maxHeight: '80vh'
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

    handleSubmit = (postID) => {
        const body = {
            body: this.state.body
        }
        this.props.commentPost(postID, body);
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

    componentDidMount(){
        this.setState({
            comments: [...this.props.things]
        });
    }

    render() {
        const{classes, things} = this.props;
        console.log(this.state.comments);
        let render;
        //dayjs(this.state.comments[i].createdTime).unix()
            let arr = [];
            for (var i = this.state.comments.length-1; i >= 0; i--) {
                arr.push(this.state.comments[i]);
                this.state.comments[i].compare = dayjs(this.state.comments[i].createdTime).unix();
            }
            let SortedArr = [];
            for (var i = 0; i < this.state.comments.length; i++) {
                if (i === 0) {
                    SortedArr.unshift(this.state.comments[0]);
                }
                if (i !== 0) {
                    if (this.state.comments[i].compare > SortedArr[0].compare) {
                        SortedArr.unshift(this.state.comments[i]);
                    } else {
                        let u = 0;
                        while ( u < SortedArr.length) {
                            if (this.state.comments[i].compare > SortedArr[u].compare) {
                                SortedArr.splice(u, 0, this.state.comments[i]);
                                break;
                            } else if (u === SortedArr.length-1 && this.state.comments[i].compare < SortedArr[u].compare) { 
                                console.log('push');
                                SortedArr.push(this.state.comments[i]);
                                break;
                            }
                            u++;
                        }
                    }
                }
            }
            console.log(SortedArr);
                render = SortedArr.map(comment => {
                   return (
                   <Card key={Math.random()*3.147} className={classes.Card}>
                       <Grid item container style={{width: "auto"}}>
                            <Grid item>
                                <Avatar alt="user avatar" src={comment.userImage} className={classes.userImage} />
                            </Grid>
                            <Grid item>
                                <Grid item>
                                    <Typography variant="h5" component={Link} color="primary" to={`/users/${comment.userHandle}`}>
                                        {comment.userHandle}
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography variant="body2" color="textSecondary">
                                        {dayjs(comment.createdTime).fromNow()}
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography variant="body1">
                                        {comment.body}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Card>);
                });
        
        
        return(
            <Dialog open={true} onClose={this.props.onClose} fullWidth maxWidth="md" style={{height: '90%'}}>
                <Grid item container style={{height: '100%'}}>
                <Grid item sm={12} style={{height: '100%'}}>
                <Card className={classes.Card}>
                <Grid item container style={{width: "auto"}}>
                    <Grid item>
                        <Avatar alt="user avatar" src={this.props.credentials.imageUrl} className={classes.userImage} />
                    </Grid>
                    <Grid item style={{width: '70%'}}>
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
                    <Grid item>
                        <Button onClick={this.onEmojiOpen} className={classes.EmojiButton} style={{marginLeft: '0.75em'}}>
                            <i className="far fa-smile-beam"></i>
                        </Button>  
                    </Grid>
                    <Grid item>
                        <Button 
                            onClick={() => this.handleSubmit(this.props.post.postID)} 
                            className={classes.EmojiButton}
                            style={{marginLeft: '0.5em'}}>
                            <i className="far fa-paper-plane"></i>
                        </Button>
                    </Grid>
                    {this.state.openEmoji ? (
                        <Dialog open={this.state.openEmoji} onClose={this.onEmojiClose}>
                            <Picker onEmojiClick={this.onEmojiCLick} disableSearchBar disableSkinTonePicker /> 
                        </Dialog>) : null}
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
    post: state.data.post
})

const mapActionToProps = {
    commentPost
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(AddComments));