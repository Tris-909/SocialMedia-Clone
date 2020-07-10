import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import Post from '../components/Post';

import {connect} from 'react-redux';
import {getPosts} from '../redux/actions/dataAction';
import {getUserData} from '../redux/actions/userAction';

export class profile extends Component {
    componentDidMount(){
        this.props.getPosts();
    }
    render() {
        let UserPost = ( !this.props.data.loading && this.props.data.posts !== undefined ) ? (
            this.props.data.posts.map(post => {
                if (this.props.user.credentials.handle === post.userHandle) {
                    return (
                        <Grid item style={{width: '50%'}}>
                            <Post key={post.postID} passedID={post.postID} name={post.userHandle} post={post} />
                        </Grid>
                    );
                }
            })
        ) : <p>loading...</p>;
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
