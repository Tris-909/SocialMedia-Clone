import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import Post from '../components/Post';
import {connect} from 'react-redux';
import Hidden from '@material-ui/core/Hidden';
import Profile from '../components/Profile';
import {getPosts, getUsers, getSingleUser} from '../redux/actions/dataAction';
import Avatar from '@material-ui/core/Avatar';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';
import PostSkeleton from '../components/PostSkeleton'
import { Typography } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardProfile from '../components/CardProfile';

const styles = theme => ({
    post: {
        position: 'absolute', 
        left: '30%',
        [theme.breakpoints.down("sm")]: {
            position: 'absolute',
            left: '0%'
        }
    },
    userChat: {
        padding: '1em',
        '&:hover': {
            backgroundColor: '#dddfe2;'
        }
    }
})

class home extends Component {
    state = {
        isShow: false
    }

    onHoverHandlerOpen = (handle) => {
        console.log(handle);
        this.props.getSingleUser(handle);
        this.setState({
            isShow: true
        });
    }

    onHoverHandlerClose = () => {
        this.setState({
            isShow: false
        });
    }

    componentDidMount(){
        this.props.getPosts();
        this.props.getUsers();
    }
    render() {
        const { posts,users, loading } = this.props.data;
        const {classes} = this.props;

        let recentPostsMarkUp = !loading ? (
            posts.map(post =>{return <Post key={post.postID} passedID={post.postID} name={post.userHandle} post={post} />} )
        ) : <PostSkeleton />;

        let UsersList = !loading ? (
            users.map( (user, index) => {
                return(
                    <React.Fragment key={user.userID}>
                    <Grid item container onMouseEnter={() => this.onHoverHandlerOpen(user.handle)} onMouseLeave={this.onHoverHandlerClose} className={classes.userChat} align="center">                  
                        <Grid item>
                            <Avatar alt="user avatar" src={user.imageUrl} />
                        </Grid>
                        <Grid item>
                            <Typography variant="body1" style={{marginLeft: '1em', marginTop: '0.5em'}}>
                                {user.handle}
                            </Typography>
                        </Grid>
                        { this.state.isShow ? (
                        <CardProfile handle={user.handle}/>
                        ) : null}
                    </Grid>
                    </React.Fragment>
                );
            })) : null;

        return (
            <React.Fragment>
            <Grid container alignItems={this.props.user.authenticated ? null : "center"} style={{position: 'relative'}}>
                <Hidden smDown>
                <Grid item md={5} sm={this.props.user.authenticated ? 4 : 4} xs={false} style={{position: "fixed", width: "28%"}}>
                    {this.props.user.authenticated ? <Profile profileData = {this.props.user.credentials}/> : null}
                </Grid>
                </Hidden>
                <Grid item lg={5} md={7} sm={this.props.user.authenticated ? 10 : 10} xs={12} className={classes.post}>
                    {recentPostsMarkUp}
                </Grid>

            </Grid>
            <Grid item container direction="column" style={{position: "fixed", left: '85%', top: '8%', height: '100vh'}}>

                <Paper style={{height: '100%'}}>
                    {UsersList}
                </Paper>
            </Grid>
            </React.Fragment>

        )
    }
}

const mapStateToProps = (state) => ({
    user: state.user,
    users: state.users,
    data: state.data
});

const mapActionToProps = {
    getPosts,
    getUsers,
    getSingleUser
}

export default connect(mapStateToProps,mapActionToProps)(withStyles(styles)(home));
