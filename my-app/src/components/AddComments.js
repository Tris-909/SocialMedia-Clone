import React, {Component} from 'react';
import withStyles from '@material-ui/core/styles/withStyles';

import dayjs from 'dayjs';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {Link} from 'react-router-dom';
import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';

import {connect} from 'react-redux';
import {getPost} from '../redux/actions/dataAction';

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
    }
}

export class AddComments extends Component {
    render() {
        const{classes} = this.props;
        let render;
        if (this.props.post.body !== undefined) {
            render = this.props.post.comments.map(comment => {
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
        }
        return(
            <React.Fragment>
                {render !== undefined ? render : null}
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.user,
    post: state.data.post
})

const mapActionToProps = {
    getPost
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(AddComments));