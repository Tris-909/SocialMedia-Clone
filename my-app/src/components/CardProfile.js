import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import withStyles from '@material-ui/core/styles/withStyles';
import {connect} from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
    card: {
        position: 'absolute',
        left: '-20%',
        width: '20em',
        
    },
    width: {
        width: '50%'
    },
    arrowRight: {
        width: '0',
        height: '0', 
        borderTop: '15px solid transparent',
        borderBottom: '15px solid transparent',
        borderLeft: '15px solid white',
        left: '-1.5%',
        position: 'absolute'
    }
})

export class CardProfile extends Component {
    state = {
        currentstatus: 0
    }

    // `${this.props.top*9 + 3}%`
    // `${this.props.top*10 + 1}%`
    render() {
        const {classes} = this.props;
        let content;
        if (this.props.singleUser.handle !== undefined ) {
            content = (
                <React.Fragment>
                <div className={classes.arrowRight} style={{ top: `3%` }}></div>
                <Card className={classes.card} style={{top: `1%`}}>
                <Grid item container style={{height: '20vh'}}>
                    <Grid item className={classes.width} style={{backgroundColor: 'red'}}>
                        <img style={{width: '100%', height: '100%'}} src={this.props.singleUser.imageUrl} alt="user avatar" />
                    </Grid>
                    <Grid item className={classes.width} style={{padding: '1em'}}> 
                        <Typography variant="h5">
                            {this.props.singleUser.handle}
                        </Typography>
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
            content = (
                    null
            );
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
    loading: state.UI.loading
})

export default connect(mapStateToProps)(withStyles(styles)(CardProfile));
