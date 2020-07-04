import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import dayjs from 'dayjs';

import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const styles = {
    container: {
        marginTop: '1em',
        marginRight: '3em',
        padding: '0em 1em 2em 1em'
    },
    avatar: {
        height: '8em',
        width: '8em',
        margin: '1em'
    },
    Name: {
        color: '#33312a',
        fontWeight: 300,
        fontFamily: 'Noto Sans JP'
    },
    itemMargin: {
        marginTop: '0.5em',
        marginBottom: '0.5em'
    },
    link: {
        color:  '#33312a',
        textDecoration: 'underline',
        '&:visited': {
            color:  '#33312a'
        }
    }
};

class Profile extends Component {
    render() {
        const {classes, profileData: {bio, website, location, email, handle, imageUrl, birth} } = this.props;
        let birthDate = null;
        if (birth !== undefined) {
            const date = (dayjs.unix(birth._seconds).$D).toString();
            const month = (dayjs.unix(birth._seconds).$M + 1).toString();
            const year = (dayjs.unix(birth._seconds).$y).toString();
            birthDate = `${date}/${month}/${year}`;
        }
        return (
            <Card className={classes.container}>
                <Grid container direction="column" alignItems="center">
                    <Grid item>
                        <Avatar alt="your avatar" src={imageUrl} className={classes.avatar}/>
                    </Grid>
                    <Grid item>
                        <Typography variant="h4" color="primary" className={classes.Name} component={Link} to={`/users/${handle}`}>
                            {handle}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="body1" className={classes.itemMargin}>
                            {birthDate}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="body1" className={classes.itemMargin}>
                            {bio}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant="h5" className={classes.itemMargin}>
                            <a href={`${website}`} target="_blank" className={classes.link}>
                                <i class="fab fa-facebook-f"></i>
                            </a>
                        </Typography>
                    </Grid>
                </Grid>
            </Card>
        );
    }
}

export default withStyles(styles)(Profile);