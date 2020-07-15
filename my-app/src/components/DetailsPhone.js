import React, { Component } from 'react'
import Picker from 'emoji-picker-react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import {connect} from 'react-redux';
import {editUserDetails, uploadImage} from '../redux/actions/userAction';
import Card from '@material-ui/core/Card';
import Tooltip from '@material-ui/core/Tooltip';
import Avatar from '@material-ui/core/Avatar';
import EditDetails from '../components/EditDetails';

const styles = theme => ({ 
    avatar: {
        height: '8em',
        width: '8em',
        margin: '1em',
        cursor: "pointer"
    },
    Card: {
        width: '100%'
    },
    editBox: {
        border: '3px solid #33312a',
        marginTop: '1em'
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
    },
});

export class DetailsPhone extends Component {
    
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
        const {classes, credentials: {bio, handle,website,insta , linkedIn,  imageUrl, birth} } = this.props;
        return (
            <React.Fragment>
                <Card className={classes.Card}>
                    <Grid item container direction="column">
                        <Grid item container justify="center">
                            <Tooltip title="Change Avatar" placement="right-start">
                                <Avatar  alt="your avatar" src={imageUrl} onClick={this.handleEditImage} className={classes.avatar}  />
                            </Tooltip>
                            <input type="file" hidden id="imageInput" onChange={this.handleImageChange} />
                        </Grid>
                        <Grid item container justify="center" align="center" direction="column">
                        <Grid item style={{marginBottom: '0.5em'}}>
                                <Typography variant="h4">
                                    {handle}
                                </Typography>
                            </Grid>   
                            <Grid item style={{marginBottom: '0.5em'}}>
                                <Typography>
                                    {birth}
                                </Typography>
                            </Grid>
                            <Grid item style={{marginBottom: '0.5em'}}>
                                <Typography>
                                    {bio}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid item container direction="row" alignItems="center" justify="center">
                        
                        {website ? 
                        (
                            <Grid item>
                            <Typography variant="h5" className={classes.itemMargin}>
                                <a href={`${website}`} target="_blank" rel="noopener noreferrer" className={classes.link}>
                                    <i className="fab fa-facebook-f"></i>
                                </a>
                            </Typography>
                            </Grid>
                        ) : null }

                        {insta ? 
                        (
                            <Grid item>
                            <Typography variant="h5" className={classes.itemMargin}>
                                <a href={`${insta}`} target="_blank" rel="noopener noreferrer" className={classes.link}>
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
                                <a href={`${linkedIn}`} target="_blank" rel="noopener noreferrer" className={classes.link}>
                                    <i className="fab fa-linkedin-in"></i>
                                </a>
                            </Typography>
                            </Grid>
                        ) 
                        : null
                        }
                        </Grid>
                        <Grid item container align="center" justify="center" className={classes.editBox}>
                            <EditDetails />
                        </Grid>
                    </Grid>
                </Card>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    credentials: state.user.credentials
});

const mapActionToProps = {
    editUserDetails,
    uploadImage
}

export default connect(mapStateToProps , mapActionToProps)(withStyles(styles)(DetailsPhone));
