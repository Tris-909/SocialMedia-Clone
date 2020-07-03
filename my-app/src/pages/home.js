import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid';
import axios from 'axios';  
import Post from '../components/Post';

export class home extends Component {
    state = {
        posts: null
    }
    
    componentDidMount(){
        axios.get(`/posts`)
            .then(res => {
                console.log(res.data);
                this.setState({
                    posts: res.data
                })
            })
            .catch(err => console.log(err));
    }

    render() {
        let recentPostsMarkUp = this.state.posts ? (
            this.state.posts.map(post => <Post post={post} />)
        ) : <p>Loading...</p>;
        return (
            <Grid container>
                <Grid item sm={8} xs={12}>
                    {recentPostsMarkUp}
                </Grid>
                <Grid item sm={4} xs={12}>
                    <p>Profile</p>
                </Grid>
            </Grid>
        )
    }
}

export default home
