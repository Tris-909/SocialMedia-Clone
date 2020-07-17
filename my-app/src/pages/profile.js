import React, { Component } from 'react'

//** MATERIAL-UI */
import Grid from '@material-ui/core/Grid';
import withStyles from '@material-ui/core/styles/withStyles';

//** REDUX-STORE */
import { connect } from 'react-redux';
import { getPosts } from '../redux/actions/dataAction';
import { getUserData } from '../redux/actions/userAction';

//** COMPONENTS */
import PostSkeleton from '../components/Skeleton/PostSkeleton';
import DetailsPhone from '../components/CardProfile/DetailsPhone';
import Post from '../components/Post/Post';

const styles = theme => ({ 
    container: {
        width: '50%',
        [theme.breakpoints.down("xs")]: {
            width: '100%'
        }
    }
});

export class profile extends Component {
    state = {
        userName: '',
        postIDparam: null
    }
    
    componentDidMount(){
        this.setState({
            userName: this.props.match.params.handle
        }); 
        const postID = this.props.match.params.postID;
        if (postID) {
            this.setState({
                postIDparam: postID
            });
        }
        this.props.getPosts();
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.match.params.handle !== this.state.userName) {
            window.location.reload();
        }
    }

    render() {
        const {classes} = this.props;
        let UserPost = ( !this.props.data.loading && this.props.data.posts !== undefined ) ? (
            !this.state.postIDparam ? (
                this.props.data.posts.map(post => {
                    if (this.state.userName === post.userHandle) {
                        return (
                            <Grid item className={classes.container} key={post.postID}>
                                <Post  passedID={post.postID} name={post.userHandle} post={post} />
                            </Grid>
                        );
                    } else {
                        return null;
                    }
                })
            ) : (
                this.props.data.posts.map(post => {
                    if (this.state.postIDparam === post.postID) {
                        return (
                            <Grid item className={classes.container} key={post.postID}>
                                <Post key={post.postID} passedID={post.postID} name={post.userHandle} post={post} />
                            </Grid>
                        );
                    }  else {
                        return null;
                    }
                })
            )
        ) : <PostSkeleton />;

        const detailUser = this.state.userName ? (
            <DetailsPhone name={this.state.userName}/>
        ) : null;

        return (
            <Grid item container direction="column" justify="center" alignItems="center">
                {detailUser}
                {UserPost}
            </Grid>
        )
    }
}
const mapStateToProps = (state) => ({
    user: state.user,
    data: state.data
});

const mapActionToProps = {
    getPosts,
    getUserData
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(profile));
