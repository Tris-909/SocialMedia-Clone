import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import Post from '../components/Post';

import {connect} from 'react-redux';
import {getPosts} from '../redux/actions/dataAction';
import {getUserData} from '../redux/actions/userAction';

import PostSkeleton from '../components/PostSkeleton';

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
    render() {
        let UserPost = ( !this.props.data.loading && this.props.data.posts !== undefined ) ? (
            !this.state.postIDparam ? (
                this.props.data.posts.map(post => {
                    if (this.state.userName === post.userHandle) {
                        return (
                            <Grid item style={{width: '50%'}}>
                                <Post key={post.postID} passedID={post.postID} name={post.userHandle} post={post} />
                            </Grid>
                        );
                    }
                })
            ) : (
                this.props.data.posts.map(post => {
                    if (this.state.postIDparam === post.postID) {
                        return (
                            <Grid item style={{width: '50%'}}>
                                <Post key={post.postID} passedID={post.postID} name={post.userHandle} post={post} />
                            </Grid>
                        );
                    }
                })
            )
        ) : <PostSkeleton />;
        return (
            <Grid item container direction="column" justify="center" alignItems="center">
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

export default connect(mapStateToProps, mapActionToProps)(profile);
