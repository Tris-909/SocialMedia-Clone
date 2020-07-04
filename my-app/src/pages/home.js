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
                console.log(res);
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
            <Grid container>
                <Grid item sm={4} xs={12}>
                    <Profile profileData = {this.props.user.credentials}/>
                </Grid>
                <Grid item sm={5} xs={12}>
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
