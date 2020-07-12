import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
    card: {
        position: 'absolute',
        left: '-20%',
        width: '20em',
        top: '3%'
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
        top: '3%',
        left: '-1.5%',
        position: 'absolute'
    }
})

export class CardProfile extends Component {
    render() {
        const {classes} = this.props;
        return (
            <React.Fragment>
                <div className={classes.arrowRight}></div>
                <Card className={classes.card}>
                <Grid item container style={{height: '20vh'}}>
                    <Grid item className={classes.width} style={{backgroundColor: 'red'}}>
                        
                    </Grid>
                    <Grid item className={classes.width} style={{padding: '1em'}}> 
                        <Typography variant="h5">
                            Freii
                        </Typography>
                        <Typography>
                            I'm Freii Swarchz
                        </Typography>
                        <Typography>
                            19/06/1999
                        </Typography>
                    </Grid>
                </Grid>
                </Card>
            </React.Fragment>
        )
    }
}

export default withStyles(styles)(CardProfile);
