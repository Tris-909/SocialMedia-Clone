import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import Post from '../components/Post';

import {connect} from 'react-redux';
import Profile from '../components/Profile';
import {getPosts} from '../redux/actions/dataAction';

class home extends Component {
    componentDidMount(){
        this.props.getPosts();
    }
    render() {
        const { posts, loading } = this.props.data;
        let recentPostsMarkUp = !loading ? (
            posts.map(post =>{return <Post key={post.postID} passedID={post.postID} name={post.userHandle} post={post} />} )
        ) : <p>Loading...</p>;
        return (
            <Grid container alignItems={this.props.user.authenticated ? null : "center"} style={{position: 'relative'}}>
                <Grid item sm={this.props.user.authenticated ? 3 : 0} XS={0} style={{position: "fixed", width: "23%"}}>
                    {this.props.user.authenticated ? <Profile profileData = {this.props.user.credentials}/> : null}
                </Grid>
                <Grid item sm={this.props.user.authenticated ? 5 : 6} xs={12} style={{position: "absolute", left: '25%'}}>
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
