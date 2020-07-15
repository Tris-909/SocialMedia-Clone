import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';

import dayjs from 'dayjs';

import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import {Link} from 'react-router-dom';
import Button from '@material-ui/core/Button';

import {connect} from 'react-redux';
import {deleteComment, likeComment ,unlikeComment} from '../redux/actions/dataAction';

const styles =  theme => ({ 
    Card: {
        paddingTop: '0.5em',        
        borderTopLeftRadius: "0px",
        borderTopRightRadius: "0px",  
        borderBottomLeftRadius: "0px",
        borderBottomRightRadius: "0px",
        boxShadow: 'none'
    },
    userImage: {
        width: "2em", 
        height: '2em', 
        margin: '1em'
    }
});

export class SingleComment extends Component {
    state = {
        isLiked: this.props.user.likes.find(like => like.commentID === this.props.comment.commentID)
    }

    likedComment = () => {
        if (this.props.user.likes.find(like => like.userHandle === this.props.comment.userHandle) && 
            this.props.user.likes.find(like => like.commentID === this.props.comment.commentID)) {
            this.setState({isLiked: true, likeCount: 1});
        } else {
            this.setState({isLiked: false});
        }
    }

    deleteComment = (postID, commentID) => {
        this.props.deleteComment(postID, commentID);
    }

    componentDidMount() {
        this.likedComment();
    }

    likeComment = () => {
        this.props.likeComment(this.props.comment.commentID);
        this.setState({isLiked: true});
    }

    unlikeComment = () => {
        this.props.unlikeComment(this.props.comment.commentID);
        this.setState({isLiked: false});
    }

    render() {
        const{classes} = this.props;
        const likeButton = !this.props.user.authenticated ? 
        (
            null
        ) : (
            this.state.isLiked ? (
                <p style={{display: 'inline', cursor: 'pointer', color: 'blue', fontWeigth: '700'}} onClick={() => this.unlikeComment(this.props.comment.commentID)}>{this.props.comment.likeCount} likes</p>
            ) : (
                <p style={{display: 'inline', cursor: 'pointer'}} onClick={() => this.likeComment(this.props.comment.commentID)}>{this.props.comment.likeCount} likes</p>
            )
        );

        return (
            <Card key={this.props.comment.commentID} className={classes.Card}>
                <Grid item container style={{width: "auto", borderBottom: '1px solid'}}>
                     <Grid item xs={3} sm={2} md={1}>
                         <Avatar alt="user avatar" src={this.props.comment.userImage} className={classes.userImage} />
                     </Grid>
                     <Grid item xs={7} sm={8} md={9}>
                         <Grid item>
                             <Typography variant="h5" component={Link} color="primary" to={`/users/${this.props.comment.userHandle}`}>
                                 {this.props.comment.userHandle}
                             </Typography>
                         </Grid>
                         <Grid item>
                             <Typography variant="body2" color="textSecondary">
                                 {dayjs(this.props.comment.createdTime).fromNow()}
                             </Typography>
                         </Grid>
                         <Grid item>
                             <Typography variant="body1" style={{width: '90%'}}>
                                 {this.props.comment.body}
                             </Typography>
                         </Grid>
                         <Grid item style={{marginBottom: '1em', marginTop: '1em'}}>
                             <Typography variant="body2" color="textSecondary">
                                  {likeButton}
                             </Typography>
                         </Grid>
                     </Grid>
                     {this.props.user.credentials.handle === this.props.comment.userHandle ? (
                     <Grid item xs={2} sm={2} md={2}>
                          <Button style={{fontSize: '1.75em', marginTop: '0.75em'}} 
                          onClick={() => this.deleteComment(this.props.post.postID, this.props.comment.commentID)}>
                              <i className="fas fa-trash"></i>
                          </Button>
                      </Grid>
                     ) : null}
                 </Grid>
             </Card>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.user,
    post: state.data.post,
    loading: state.UI.loading
})

const mapActionToProps = {
    deleteComment,
    likeComment,
    unlikeComment
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(SingleComment));
