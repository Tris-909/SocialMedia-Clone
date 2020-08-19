import React, { Component } from 'react'

//** NPM PACKAGES */
import InfiniteScroll from 'react-infinite-scroll-component';

//** MATERIAL-UI */
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';
import { Typography } from '@material-ui/core';

//** REDUX STORE */
import {connect} from 'react-redux';
import {
    getPosts, 
    getUsers, 
    getSingleUser, 
    openCardProfile, 
    closeCardProfile, 
    getFirstSetOfPosts, 
    getMorePosts, 
    countPosts
} from '../redux/actions/dataAction';
import {
    getUserData
} from '../redux/actions/userAction';

//** COMPONENTS */
import Profile from '../components/CardProfile/Profile';
import PostSkeleton from '../components/Skeleton/PostSkeleton';
// import CardProfile from '../components/CardProfile/CardProfile';
import Post from '../components/Post/Post';

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
        borderBottom: '1px solid black',
        '&:hover': {
            backgroundColor: '#dddfe2;'
        }
    },
    input: {
        width: '100%', 
        height: '100%',
        borderTopLeftRadius: "0px",
        borderTopRightRadius: "0px",  
        borderLeft: '0px',
        borderTop: '2px solid black',
        '&::placeholder': {
            fontSize: '0.875rem',
            paddingLeft: '1em'
        },
        '&::focus': {
            outline: 'none',
            outlineOffset: 'none'
        },
        fontSize: '1.25rem'
    },
    friendList: {
        borderBottomLeftRadius: "0px",
        borderBottomRightRadius: "0px"
    },
    position: {
        position: 'relative',
        [theme.breakpoints.down("xs")]: {
            position: 'initial'
        }
    },
    EndPosts: {
        fontSize: '3.25em',
        fontFamily: 'Lobster',
        [theme.breakpoints.down("xs")]: {
            fontSize: '1.75em'
        }
    }
})

class home extends Component {
    state = {
        userList: [],
        firsttime: true
    }

    onHoverHandlerOpen = (handle) => {
        this.props.getSingleUser(handle);
        this.props.openCardProfile();
    }

    onHoverHandlerClose = () => {
        this.props.closeCardProfile();
    }

    componentDidMount(){
        this.props.countPosts();
        this.props.getFirstSetOfPosts();
        this.props.getUsers();
        this.props.getUserData();
    }

    searchHandler = (event) => {
        this.setState({
            firsttime: false
        });
        let searchQuery = event.target.value.toLowerCase();
        let displayUsers = this.props.data.users.filter((el) => {
            let searchValue = el.handle.toLowerCase();
            return searchValue.indexOf(searchQuery) !== -1;
        });
        this.setState({
            userList: displayUsers
        });
    }

    updateStateFirstTime = () => {
        this.setState({
            userList: this.props.data.users
        });
    }

    render() {
        const { posts,users, loading, last } = this.props.data;
        const {classes} = this.props;

        let recentPostsMarkUp = !loading ? this.props.user.credentials.handle ? (
            <InfiniteScroll
                dataLength={this.props.data.posts.length} 
                next={() => this.props.getMorePosts(last)}
                hasMore={this.props.data.posts.length < this.props.data.numberOfPosts ? true : false}
                loader={null}
                endMessage={
                  <Card style={{width: '100%'}}>
                    <Grid item container justify="center" style={{margin: '1em'}}>
                        <Typography className={classes.EndPosts} style={{fontWeight: '400'}}>
                            You have read all the posts.
                        </Typography>
                    </Grid>
                  </Card>
                }>
                    {posts.map(post =>{return <Post key={post.postID} passedID={post.postID} name={post.userHandle} post={post} />}) }
                </InfiniteScroll> 
        ) : <PostSkeleton /> : <PostSkeleton />;

        let UsersList = !loading ? 
        this.state.firsttime ? (
            users.map( (user) => {
                return(
                    <React.Fragment key={user.userID}>
                    <Grid 
                    item 
                    container 
                    onMouseEnter={() => this.onHoverHandlerOpen(user.handle)} 
                    className={classes.userChat} 
                    align="center">                  
                        <Grid item>
                            <Avatar alt="user avatar" src={user.imageUrl} />
                        </Grid>
                        <Grid item>
                            <Typography variant="body1" style={{marginLeft: '1em', marginTop: '0.5em'}}>
                                {user.handle}
                            </Typography>
                        </Grid>
                    </Grid>
                    </React.Fragment>
                )})) : (
                    this.state.userList.map( (user) => {
                        return(
                            <React.Fragment key={user.userID}>
                            <Grid 
                            item 
                            container 
                            onMouseEnter={() => this.onHoverHandlerOpen(user.handle)} 
                            className={classes.userChat} 
                            align="center">                  
                                <Grid item>
                                    <Avatar alt="user avatar" src={user.imageUrl} />
                                </Grid>
                                <Grid item>
                                    <Typography variant="body1" style={{marginLeft: '1em', marginTop: '0.5em'}}>
                                        {user.handle}
                                    </Typography>
                                </Grid>
                            </Grid>
                            </React.Fragment>
                        );
                    })) : null;

        return (
            <React.Fragment>
            <Grid container alignItems={this.props.user.authenticated ? null : "center"} className={classes.position}>
                <Hidden smDown>
                <Grid item md={5} sm={this.props.user.authenticated ? 4 : 4} xs={false} style={{position: "fixed", width: "28%"}}>
                    {this.props.user.authenticated ? <Profile profileData = {this.props.user.credentials}/> : null}
                </Grid>
                </Hidden>
                <Grid item lg={6} md={6} sm={this.props.user.authenticated ? 12 : 12} xs={12} className={classes.post}>
                    {recentPostsMarkUp}
                </Grid>
            </Grid>
            <Hidden smDown>
            <Grid item container direction="column" style={{position: "fixed", left: '85%', top: '8%', height: '100vh'}}>
                <Paper className={classes.friendList} style={{height: '85%'}}>
                    {/* {this.props.openCardProfile ? <CardProfile /> : null} */}
                    {UsersList}
                </Paper>
                <Paper style={{height: '8%'}}>
                    <input type="text" onChange={this.searchHandler} placeholder="Search" className={classes.input} />
                </Paper>
            </Grid>
            </Hidden>
            </React.Fragment>

        )
    }
}

const mapStateToProps = (state) => ({
    user: state.user,
    users: state.users,
    data: state.data,
    openCardProfile: state.UI.openCardProfile,
    last: state.data.last
});

const mapActionToProps = {
    getUserData,
    getPosts,
    getUsers,
    getSingleUser,
    openCardProfile,
    closeCardProfile,
    getFirstSetOfPosts,
    getMorePosts,
    countPosts
}

export default connect(mapStateToProps,mapActionToProps)(withStyles(styles)(home));
