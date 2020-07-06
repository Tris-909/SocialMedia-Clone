import React, { Component } from 'react'
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

// Mui Stuff
import withStyles from '@material-ui/core/styles/withStyles';
import {Link} from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import ChatIcon from '@material-ui/icons/Chat';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

import {connect} from 'react-redux';
import {likePost, unlikePost, deletePost} from '../redux/actions/dataAction';

const styles = {
    card: {
        display: 'flex',
        marginTop: '1em',
        alignItems: "center",
        borderBottomLeftRadius: "0px",
        borderBottomRightRadius: "0px"
    },
    CommentSection: {
        borderTopLeftRadius: "0px",
        borderTopRightRadius: "0px"
    },
    SecCard: {
        display: 'flex',
        alignItems: 'space-between'
    },
    content: {
        padding: '1em',
        objectFit: 'cover',
        width: '100%'
    },
    userImage: {
        width: "5em", 
        height: '5em', 
        margin: '1em'
    },
    DetailBox: {
        marginTop: '1em'
    },
    icon: {
        fontSize: '2rem'
    }
};

export class Post extends Component {
    state = {
        isLiked: this.props.user.likes.find(like => like.postID === this.props.post.postID)
    }
    likedPost = () => {
        if (this.props.user.likes && this.props.user.likes.find(like => like.postID === this.props.post.postID)) {
            this.setState({isLiked: true});
        } else {
            this.setState({isLiked: false});
        }
    }
    likePost = () => {
        this.props.likePost(this.props.post.postID);
        this.setState({isLiked: true,  firstTime: false});
    }
    unlikePost = () => {
        this.props.unlikePost(this.props.post.postID);
        this.setState({isLiked: false,  firstTime: false});
    }
    deletePost = () => {
        this.props.deletePost(this.props.post.postID);
    }
    componentDidMount() {
        this.likedPost();
    }
    render() {    
        dayjs.extend(relativeTime);
        // eslint-disable-next-line
        const {classes, post : { body, createdTime, userImage, userHandle, postID, likeCount, commentCount}, user: {authenticated} } = this.props;
        
        const likeButton = !authenticated ? 
        (
            null
        ) : (
            this.state.isLiked ? (
            <Button onClick={this.unlikePost}>
                <Favorite color="secondary" className={classes.icon}/>
            </Button>
            ) : (
            <Button onClick={this.likePost}>
                <FavoriteBorder color="secondary" className={classes.icon}/>
            </Button>
            )
        );

        return (
        <React.Fragment>
            <Card className={classes.card}>
                <Avatar alt="user avatar" src={userImage} className={classes.userImage} />
                <CardContent className={classes.content}>
                    <Grid container justify="space-between">
                        <Grid item>
                            <Typography variant="h5" component={Link} color="primary" to={`/users/${userHandle}`}>
                                {userHandle}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Button onClick={this.deletePost}>
                                <i className="fas fa-trash"></i>
                            </Button>
                        </Grid>
                    </Grid>

                    <Typography variant="body2" color="textSecondary">
                        {dayjs(createdTime).fromNow()}
                    </Typography>
                    <Typography variant="body1">
                        {body}
                    </Typography>
                    <Grid container direction="row" justify="space-between" className={classes.DetailBox}>
                        <Grid item>{likeCount} Likes</Grid>
                        <Grid item>{commentCount} Comment</Grid>
                    </Grid>

                </CardContent>
            </Card>
            <Card className={classes.CommentSection}>
                <Grid item container align="center" direction="row" justify="space-between">
                    <Grid item style={{width: "50%"}}>
                        {likeButton} 
                    </Grid> 
                    <Grid item style={{width: "50%"}}>  
                        <Button>
                            <ChatIcon className={classes.icon}/> 
                        </Button>
                    </Grid>
                </Grid>
            </Card>
        </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.user
});

const mapActionToProps = {
    likePost, 
    unlikePost,
    deletePost
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(Post));
