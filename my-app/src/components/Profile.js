import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import dayjs from 'dayjs';
import EditDetails from '../components/EditDetails';

import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';

import {connect} from 'react-redux';
import {uploadImage, logoutUser} from '../redux/actions/userAction';

const styles = {
    container: {
        marginTop: '1em',
        marginRight: '3em',
        padding: '0em 1em 2em 1em'
    },
    avatar: {
        height: '8em',
        width: '8em',
        margin: '1em',
        cursor: "pointer"
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
        margin: '1em',
        textDecoration: 'underline',
        '&:visited': {
            color:  '#33312a'
        }
    }
};

class Profile extends Component {
    handleImageChange = (event) => {
        const image = event.target.files[0];
        const formData = new FormData();
        formData.append('image', image, image.name);
        this.props.uploadImage(formData);
    };
    handleEditImage = () => {
        const fileInput = document.getElementById('imageInput');
        fileInput.click();
    };
    render() {
        const {classes, profileData: {bio, website, insta, linkedIn ,location, email, handle, imageUrl, birth} } = this.props;
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
                    <Grid item style={{position: 'relative'}}>
                        <Tooltip title="Change Avatar" placement="right-start" className={classes.tooltip}> 
                            <Avatar alt="your avatar" src={imageUrl} onClick={this.handleEditImage} className={classes.avatar} />
                        </Tooltip>
                        <input type="file" hidden id="imageInput" onChange={this.handleImageChange} />
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
                    <Grid item container direction="row" alignItems="center" justify="center">
                        
                        {website ? 
                        (
                            <Grid item>
                            <Typography variant="h5" className={classes.itemMargin}>
                                <a href={`${website}`} target="_blank" className={classes.link}>
                                    <i className="fab fa-facebook-f"></i>
                                </a>
                            </Typography>
                            </Grid>
                        ) : null }

                        {insta ? 
                        (
                            <Grid item>
                            <Typography variant="h5" className={classes.itemMargin}>
                                <a href={`${insta}`} target="_blank" className={classes.link}>
                                    <i className="fab fa-instagram"></i>
                                </a>
                            </Typography>
                            </Grid>
                        )
                        : null }

                        {linkedIn ? 
                        (
                            <Grid item>
                            <Typography variant="h5" className={classes.itemMargin}>
                                <a href={`${linkedIn}`} target="_blank" className={classes.link}>
                                    <i className="fab fa-linkedin-in"></i>
                                </a>
                            </Typography>
                            </Grid>
                        ) 
                        : null
                        }

                        <EditDetails />
                    </Grid>
                </Grid>
            </Card>
        );
    }
}

const mapActionToProps = {
    uploadImage,
    logoutUser
}

export default connect(null, mapActionToProps)(withStyles(styles)(Profile));