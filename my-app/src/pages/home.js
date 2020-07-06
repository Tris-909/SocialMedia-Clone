import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import Post from '../components/Post';

import {connect} from 'react-redux';
import Profile from '../components/Profile';
import {getPosts} from '../redux/actions/dataAction';

class home extends Component {
    state = {
        posts: null,
    }
    
    componentDidMount(){
        this.props.getPosts();
    }
    render() {
        const { posts, loading } = this.props.data;
        console.log(posts);
        let recentPostsMarkUp = !loading ? (
            posts.map(post => <Post key={post.postID} post={post} />)
        ) : <p>Loading...</p>;
        return (
            <Grid container alignItems={this.props.user.authenticated ? null : "center"}>
                <Grid item sm={this.props.user.authenticated ? 3 : 0} xs={12}>
                    {this.props.user.authenticated ? <Profile style={{position: "fixed"}} profileData = {this.props.user.credentials}/> : null}
                </Grid>
                <Grid item sm={this.props.user.authenticated ? 5 : 6} xs={12}>
                    {recentPostsMarkUp}
                </Grid>
            </Grid>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.user,
    data: state.data
});

const mapActionToProps = {
    getPosts
}

export default connect(mapStateToProps,mapActionToProps)(home);
