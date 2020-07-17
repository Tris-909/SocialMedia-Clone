import React from 'react';

//** BLANK IMAGES FOR SKELETONS  */
import Noimg from '../../images/blank-profile-picture-973460_960_720.png';

//** MATERIAL-UI */
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = {
    card: {
        display: 'flex',
        marginTop: '1em',
        alignItems: "center",
        borderBottomLeftRadius: "0px",
        borderBottomRightRadius: "0px"
    },
    content: {
        padding: '1em',
        objectFit: 'cover',
        width: '100%'
    },
    userImage: {
        width: "4em", 
        height: '4em', 
        marginLeft: '1em',
        marginRight: '1em',
        marginBottom: '1em'
    },
    DetailBox: {
        marginTop: '1em'
    },
    CommentSection: {
        borderTopLeftRadius: "0px",
        borderTopRightRadius: "0px",  
        borderBottomLeftRadius: "0px",
        borderBottomRightRadius: "0px"
    },
    buttonContainer: {
        borderTop: '1px solid black',
        borderBottom: '1px solid black'
    },
    likeButton: {
        width: "50%",
        border: '0px',
        borderRight: '1px solid black'
    },
    commentButton: {
        width: "100%",
        border: '0px',
    }
}

const PostSkeleton = (props) => {
    const {classes} = props;

    const content = Array.from({length: 2}).map((item, index) => (
        <React.Fragment key={Math.random()}> 
        <Card className={classes.card}>
        <CardContent className={classes.content}>
            <Grid container justify="space-between">
                <Grid item container style={{width: "100%"}}>
                <Grid item>
                    <Avatar alt="user avatar" src={Noimg} className={classes.userImage} />
                </Grid>
                <Grid item style={{width: '78%'}}>
                    <Grid item container justify="space-between">
                        <Grid item>
                        </Grid>
                        <Grid item>
                        </Grid>
                    </Grid>
                    <Grid item>
                    </Grid>
                    <Grid item>
                    </Grid>
                </Grid>
                </Grid>
            </Grid>
            <img src={Noimg} alt="ERROR" style={{width: '100%'}}/>
            <Grid container direction="row" justify="space-between" className={classes.DetailBox}>
                <Grid item>                            
                </Grid>
                <Grid item>                            
                </Grid>
            </Grid>
        </CardContent>
    </Card>
    <Card className={classes.CommentSection}>
        <Grid item container align="center" direction="row" justify="space-between" className={classes.buttonContainer}>
            <Grid item className={classes.likeButton} style={{paddingTop: '1em', paddingBottom: '1em'}}>
            </Grid> 
            <Grid item style={{width: "50%", paddingTop: '1em', paddingBottom: '1em'}}>  

            </Grid>
        </Grid>
    </Card>
    </React.Fragment>
    ));

    return(
        <React.Fragment>
            {content}
        </React.Fragment>
    );
}

export default withStyles(styles)(PostSkeleton);