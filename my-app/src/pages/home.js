import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import axios from 'axios';  
import Post from '../components/Post';

import {connect} from 'react-redux';
import Profile from '../components/Profile';

class home extends Component {
    state = {
        posts: null,
    }
    
    componentDidMount(){
        axios.get(`/posts`)
            .then(res => {
                this.setState({
                    posts: res.data
                })
            })
            .catch(err => console.log(err));
    }

    render() {
        let recentPostsMarkUp = this.state.posts ? (
            this.state.posts.map(post => <Post key={post.postID} post={post} />)
        ) : <p>Loading...</p>;
        return (
            <Grid container alignItems={this.props.user.authenticated ? null : "center"}>
                <Grid item sm={this.props.user.authenticated ? 4 : 0} xs={12}>
                    {this.props.user.authenticated ? <Profile profileData = {this.props.user.credentials}/> : null}
                </Grid>
                <Grid item sm={this.props.user.authenticated ? 5 : 6} xs={12}>
                    {recentPostsMarkUp}
                </Grid>
            </Grid>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.user
});


export default connect(mapStateToProps)(home);
