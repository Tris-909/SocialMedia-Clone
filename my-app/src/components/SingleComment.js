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

const styles = {
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
    },
}

export class SingleComment extends Component {
    
    deleteComment = (postID, commentID) => {
        this.props.deleteComment(postID, commentID);
    }

    render() {
        const{classes} = this.props;

        return (
            <Card key={this.props.comment.commentID} className={classes.Card}>
                <Grid item container style={{width: "auto", borderBottom: '1px solid'}}>
                     <Grid item>
                         <Avatar alt="user avatar" src={this.props.comment.userImage} className={classes.userImage} />
                     </Grid>
                     <Grid item style={{width: '80%'}}>
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
                                 {this.props.comment.likeCount} <p style={{display: 'inline', cursor: 'pointer'}} onClick={() => this.onLikeHandler(this.props.comment.commentID)}>likes</p>
                             </Typography>
                         </Grid>
                     </Grid>
                     {this.props.user.credentials.handle === this.props.comment.userHandle ? (
                     <Grid item>
                          <Button style={{fontSize: '1.5em', marginTop: '0.75em'}} 
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
