import React, { Component } from 'react'
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

// Mui Stuff
import withStyles from '@material-ui/core/styles/withStyles';
import {Link} from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const styles = makeStyles((theme) => ({
    card: {
        display: 'flex',
        marginBottom: '2em',
        marginTop: '3em',
        alignItems: "center"
    },
    large: {
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
    content: {
        padding: '1em',
        objectFit: 'cover'
    }
}));

export class Post extends Component {
    render() {    
        dayjs.extend(relativeTime);
        // eslint-disable-next-line
        const {classes, post : { body, createdTime, userImage, userHandle, postID, likeCount, commentCount} } = this.props;
        return (
            <Card className={classes.card} style={{display: 'flex', alignItems: "center", marginTop: '2em'}}>
                <Avatar alt="user avatar" src={userImage} style={{width: "5em", height: '5em', margin: '1em'}}/>
                <CardContent className={classes.content}>
                    <Typography variant="h5" component={Link} color="primary" to={`/users/${userHandle}`}>
                        {userHandle}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        {dayjs(createdTime).fromNow()}
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
