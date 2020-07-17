import React, { Component } from 'react'

//** NPM PACKAGES */
import {Link} from 'react-router-dom';

//** MATERIAL-UI */
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import withStyles from '@material-ui/core/styles/withStyles';

//** REDUX STORE */
import {connect} from 'react-redux';
import {closeCardProfile} from '../../redux/actions/dataAction';

const styles = theme => ({
    card: {
        position: 'absolute',
        left: '-20%',
        width: '20em'    
    },
    width: {
        width: '50%'
    },
})

export class CardProfile extends Component {    
    render() {
        const {classes} = this.props;
        let content;
        if (this.props.singleUser.handle !== undefined ) {
            if (this.props.openCardProfile) {
                content = (
                    <React.Fragment>
                    <Card className={classes.card} style={{top: `1%`}}>
                    <Grid item container style={{height: '20vh'}}>
                        <Grid item className={classes.width} style={{backgroundColor: 'red'}}>
                            <img style={{width: '100%', height: '100%'}} src={this.props.singleUser.imageUrl} alt="user avatar" />
                        </Grid>
                        <Grid item className={classes.width} style={{padding: '1em'}}> 
                            <Grid item container justify="space-between">
                                <Grid item>
                                    <Typography variant="h5" component={Link} style={{textDecoration: 'underline'}} color="primary" to={`/profile/${this.props.singleUser.handle}`}>
                                        {this.props.singleUser.handle}
                                    </Typography>
                                </Grid>
                                <Grid item style={{fontSize: '1.25rem'}} onClick={() => this.props.closeCardProfile()}>
                                    <i className="fas fa-times"></i>
                                </Grid>
                            </Grid>

                            <Typography>
                                {this.props.singleUser.bio}
                            </Typography>
                            <Typography>
                                {this.props.singleUser.birth}
                            </Typography>
                        </Grid>
                    </Grid>
                    </Card>
                    </React.Fragment>
                );
            } else {
                content = null;
            }
        } else {
            content = null;
        }
        return (
            <React.Fragment>
                {content}
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => ({
    singleUser: state.data.singleUser,
    loading: state.UI.loading,
    openCardProfile: state.UI.openCardProfile
})

const mapActionToProps = {
    closeCardProfile
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(CardProfile));
