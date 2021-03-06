import React, { Component } from 'react'

//** MARTERIAL-UI IMPORTS */
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import Card from '@material-ui/core/Card';
import Tooltip from '@material-ui/core/Tooltip';
import Avatar from '@material-ui/core/Avatar';

//** REDUX STORE */
import {connect} from 'react-redux';
import {getUser} from '../../redux/actions/dataAction';
import {editUserDetails, uploadImage} from '../../redux/actions/userAction';

//* COMPONENTS */
import EditDetails from './EditDetails';

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
    
    componentDidMount() {
        this.props.getUser(this.props.name);
    }

    render() {
        const {classes} = this.props;
        let content = (
            <Card className={classes.Card}>
                    <Grid item container direction="column">
                        <Grid item container justify="center">
                            <Tooltip title="Change Avatar" placement="right-start">
                                <Avatar  alt="your avatar" src={this.props.user.imageUrl} onClick={this.props.name === this.props.credentials.handle ? this.handleEditImage : null} className={classes.avatar}  />
                            </Tooltip>
                            <input type="file" hidden id="imageInput" onChange={this.handleImageChange} />
                        </Grid>
                        <Grid item container justify="center" align="center" direction="column">
                        <Grid item style={{marginBottom: '0.5em'}}>
                                <Typography variant="h4">
                                    { this.props.user.handle}
                                </Typography>
                            </Grid>   
                            <Grid item style={{marginBottom: '0.5em'}}>
                                <Typography>
                                    { this.props.user.birth}
                                </Typography>
                            </Grid>
                            <Grid item style={{marginBottom: '0.5em'}}>
                                <Typography>
                                    { this.props.user.bio}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid item container direction="row" alignItems="center" justify="center">
                        
                        { this.props.user.website ? 
                        (
                            <Grid item>
                            <Typography variant="h5" className={classes.itemMargin}>
                                <a href={`${ this.props.user.website}`} target="_blank" rel="noopener noreferrer" className={classes.link}>
                                    <i className="fab fa-facebook-f"></i>
                                </a>
                            </Typography>
                            </Grid>
                        ) : null }

                        { this.props.user.insta ? 
                        (
                            <Grid item>
                            <Typography variant="h5" className={classes.itemMargin}>
                                <a href={`${ this.props.user.insta}`} target="_blank" rel="noopener noreferrer" className={classes.link}>
                                    <i className="fab fa-instagram"></i>
                                </a>
                            </Typography>
                            </Grid>
                        )
                        : null }

                        { this.props.user.linkedIn ? 
                        (
                            <Grid item>
                            <Typography variant="h5" className={classes.itemMargin}>
                                <a href={`${ this.props.user.linkedIn}`} target="_blank" rel="noopener noreferrer" className={classes.link}>
                                    <i className="fab fa-linkedin-in"></i>
                                </a>
                            </Typography>
                            </Grid>
                        ) 
                        : null
                        }
                        </Grid>
                        {this.props.name === this.props.credentials.handle ? (
                        <Grid item container align="center" justify="center" className={classes.editBox}>
                            <EditDetails />
                        </Grid>
                        ) : null}
                    </Grid>
                </Card>
        );

        return (
            <React.Fragment>
                {content}
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    credentials: state.user.credentials,
    user: state.data.user
});

const mapActionToProps = {
    editUserDetails,
    uploadImage,
    getUser
}

export default connect(mapStateToProps , mapActionToProps)(withStyles(styles)(DetailsPhone));
