import React, { Component } from 'react'
import ReadMoreAndLess from 'react-read-more-less';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import DeleteButton from './DeleteButton';
import AddComments from './AddComments';
// Mui Stuff
import withStyles from '@material-ui/core/styles/withStyles';
import {Link} from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import CircularProgress from '@material-ui/core/CircularProgress';

//Mui MENU
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';


//Mui Icon
import ChatIcon from '@material-ui/icons/Chat';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';

//REDUX
import {connect} from 'react-redux';
import {likePost, unlikePost, getPost, commentPost} from '../redux/actions/dataAction';
import {uploadPostImage, getUserData} from '../redux/actions/userAction';

const styles =  theme => ({
    card: {
        display: 'flex',
        marginTop: '1em',
        alignItems: "center",
        borderBottomLeftRadius: "0px",
        borderBottomRightRadius: "0px"
    },
    CommentSection: {
        borderTopLeftRadius: "0px",
        borderTopRightRadius: "0px",  
        borderBottomLeftRadius: "0px",
        borderBottomRightRadius: "0px"
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
        width: "4em", 
        height: '4em', 
        marginLeft: '1em',
        marginRight: '1em',
        marginBottom: '1em',
        [theme.breakpoints.down("xs")]: {
            width: "2.5em", 
            height: '2.5em', 
            marginLeft: '0em',
            marginRight: '1em',
            marginBottom: '1em',
        }
    },
    DetailBox: {
        marginTop: '1em'
    },
    icon: {
        fontSize: '2rem'
    },
    buttonContainer: {
        borderTop: '1px solid black',
        borderBottom: '1px solid black'
    },
    likeButton: {
        width: "50%",
        border: '0px',
        borderRight: '1px solid black'
    },
    commentButton: {
        width: "100%",
        border: '0px',
    },
    widthControl: {
        width: '75%',
        [theme.breakpoints.down("sm")]: {
            width: '70%'
        },
        [theme.breakpoints.down("xs")]: {
            width: '78%'
        },
        [theme.breakpoints.down("md")]: {
            width: '73%'
        }
    }
});

export class Post extends Component {
    state = {
        isLiked: this.props.user.likes.find(like => like.postID === this.props.post.postID),
        likeCount: 0,
        commentCount: 0,
        openComment: false,
        body: '',
        editPost: false,
        anchorEl: null
    }
     

    likedPost = () => {
        if (this.props.user.likes.find(like => like.userHandle === this.props.post.userHandle) && 
            this.props.user.likes.find(like => like.postID === this.props.post.postID)) {
            this.setState({isLiked: true, likeCount: 1});
        } else {
            this.setState({isLiked: false});
        }
    }

    // EDIT POST MENU
    handleOpen = (event) => {
        this.setState({
            anchorEl:  event.target
        });
    }

    handleClose = () => {
        this.setState({
            anchorEl: null 
        });
    }

    // LIKE AND UNLIKE A POST
    likePost = () => {
        this.props.likePost(this.props.post.postID);
        this.setState({isLiked: true});
    }
    unlikePost = () => {
        this.props.unlikePost(this.props.post.postID);
        this.setState({isLiked: false});
    }
    ///////////////////////////////////////////////////////

    // LIKED POST RENDER FULLHEART ICON
    componentDidMount() {
        this.likedPost();
    }
    ///////////////////////////////////////////////////////

    // lOADING COMMENTS
    onOpenComment = () => {
        this.setState({
            openComment: true
        });
        this.props.getPost(this.props.post.postID);
    }

    onCloseComment = () => {
        this.props.getPost(this.props.post.postID);
        this.setState({
            openComment: false
        });
    }
    ///////////////////////////////////////////////////////

    // POST IMAGE UPLOAD 
    handleImageChange = (postID, event) => {
        const image = event.target.files[0];
        const formData = new FormData();
        formData.append('image', image, image.name);
        this.props.uploadPostImage(formData, postID);
    };
    handleEditImage = () => {
        const fileInput = document.getElementById('imagePostInput');
        fileInput.click();
    };
    /////////////////////////////////////////////////////////////////

    render() {    
        dayjs.extend(relativeTime);
        const anchorEl = this.state.anchorEl;
        // eslint-disable-next-line
        const {classes, post : { body, createdTime, imagePostUrl, userImage, userHandle, postID, likeCount, commentCount}, user: {authenticated, credentials} } = this.props;
        const likeButton = !authenticated ? 
        (
            null
        ) : (
            this.state.isLiked ? (
            <Button onClick={this.unlikePost} style={{height: '100%',padding: '1em', width: '100%'}}>
                <Favorite color="secondary" className={classes.icon}/>
            </Button>
            ) : (
            <Button onClick={this.likePost} style={{height: '100%',padding: '1em', width: '100%'}}>
                <FavoriteBorder color="secondary" className={classes.icon}/>
            </Button>
            )
        );
        
        const deleteButton = this.props.user.credentials.handle === this.props.post.userHandle ? (
            <DeleteButton thisPostID={postID}/>
        )  : null;
        
        const addImageButton = this.props.user.credentials.handle === this.props.post.userHandle ? (
            <Tooltip title="Add Image" placement="left-start" className={classes.tooltip}> 
            <Button onClick={this.handleEditImage}  style={{fontSize: '1.5em'}} >
                <i className="far fa-image"></i>
            </Button>
            </Tooltip>
        ) : null;   
        
        const EditPostButton = this.props.user.credentials.handle === this.props.post.userHandle ? (
            <Tooltip title="Edit" placement="bottom">
            <Button aria-owns={anchorEl ? 'simple-menu' : undefined} color="inherit" style={{fontSize: '1.25rem'}} aria-haspopup="true" onClick={this.handleOpen}>
                <i className="fas fa-ellipsis-h"></i>
            </Button>
            </Tooltip>
        ) : null;

        return (
        <React.Fragment>
            <Card className={classes.card}>
                <CardContent className={classes.content}>
                    <Grid container justify="space-between">
                        <Grid item container style={{width: "100%"}}>
                        <Grid item>
                            <Avatar alt="user avatar" src={userImage} className={classes.userImage} />
                        </Grid>
                        <Grid item className={classes.widthControl}>
                            <Grid item container justify="space-between">
                                <Grid item>
                                    <Typography variant="h5" component={Link} color="primary" to={`/profile/${userHandle}`}>
                                        {userHandle}
                                    </Typography>
                                </Grid>
                                <Grid item>
                                {EditPostButton}
                                <Menu  disableScrollLock={true}  anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={this.handleClose} onEntered={this.onMenuOpened}>
                                    <MenuItem onClick={this.handleClose}>{addImageButton}</MenuItem>
                                    <MenuItem>{deleteButton}</MenuItem>
                                </Menu>
                                    {this.props.user.credentials.handle === this.props.post.userHandle ? 
                                    <input type="file" hidden id="imagePostInput" 
                                    onChange={(event) => this.handleImageChange(`${postID}`, event)} /> : null}
                                </Grid>
                            </Grid>
                            <Grid item>
                                <Typography variant="body2" color="textSecondary">
                                    {dayjs(createdTime).fromNow()}
                                </Typography>
                            </Grid>
                        </Grid>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Typography variant="body1" style={{fontSize: '1.25em', marginBottom: '1em'}}>
                           <ReadMoreAndLess ref={this.Readmore} charLimit={500}  readMoreText="Read more" readLessText="Read less">
                               {body}
                            </ReadMoreAndLess> 
                        </Typography>
                    </Grid>
                    {imagePostUrl !== undefined ? <img src={imagePostUrl} alt="ERROR" style={{width: '100%'}}/> : null}
                    <Grid container direction="row" justify="space-between" className={classes.DetailBox}>
                        <Grid item>{likeCount} Likes</Grid>
                        <Grid item>{commentCount} Comment</Grid>
                    </Grid>
                </CardContent>
            </Card>
            <Card className={classes.CommentSection}>
                <Grid item container align="center" direction="row" justify="space-between" className={classes.buttonContainer}>
                    <Grid item className={classes.likeButton} style={{height: '100%'}}>
                        {likeButton} 
                    </Grid> 
                    <Grid item style={{width: "50%"}}>  
                        <Button className={classes.commentButton} onClick={this.onOpenComment} style={{color: '#33312a', height: '100%', padding: '1em'}}>
                        {!this.props.loading ? ( <ChatIcon className={classes.icon}/> ) : <CircularProgress color="inherit"/>}
                        </Button>
                    </Grid>
                </Grid>
            </Card>
            {this.state.openComment ? !this.props.loading ? 
                <AddComments 
                    open={this.state.openComment} 
                    onClose={this.onCloseComment}
                    key={postID} 
                    credentials={credentials} 
                    postID={postID}/>  : null : null}
        </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.user,
    data: state.data,
    comments: state.data.post.comments,
    loading: state.UI.loading
});

const mapActionToProps = {
    likePost, 
    unlikePost,
    uploadPostImage,
    getPost,
    commentPost,
    getUserData
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(Post));
