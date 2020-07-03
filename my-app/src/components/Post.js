import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import {Link} from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import Typography from '@material-ui/core/Typography';

const styles = {
    card: {
        display: 'flex',
        marginBottom: '2em',
        marginTop: '3em'
    },
    image: {
        minWidth: 200,
    },
    content: {
        padding: '1em',
        objectFit: 'cover'
    }
}

export class Post extends Component {
    render() {
        // eslint-disable-next-line
        const { classes, post : { body, createdTime, userImage, userHandle, postID, likeCount, commentCount} } = this.props;
        return (
            <Card className={classes.card}>
                <CardMedia image={userImage} title="Profile Image" className={classes.image} />
                <CardContent className={classes.content}>
                    <Typography variant="h5" component={Link} color="primary" to={`/users/${userHandle}`}>
                        {userHandle}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        {createdTime}
                    </Typography>
                    <Typography variant="body1">
                        {body}
                    </Typography>
                </CardContent>
            </Card>
        )
    }
}

export default withStyles(styles)(Post);
