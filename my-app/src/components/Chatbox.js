import React, { Component } from 'react'
import {Link} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import withStyles from '@material-ui/core/styles/withStyles';
import {connect} from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    card: {
        position: 'absolute',
        left: '-21%',
        width: '22em',
        height: '23em'
        
    },
    width: {
        width: '80%'
    },
    name: {
        marginTop: '0.5em',
        fontWeight: 700
    }
})

const CssTextField = withStyles({
    root: {
      '& label.Mui-focused': {
        color: '#33312a',
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: '#33312a',
      },
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: '#33312a',
        },
        '&:hover fieldset': {
          borderColor: '#33312a',
        },
        '&.Mui-focused fieldset': {
          borderColor: '#33312a',
        },
      },
    },
  })(TextField);

export class Chatbox extends Component {
    state = {
        body: ""
    }

    onChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    render() {
        const {classes} = this.props;
        let content;
        console.log(this.props);
        if (this.props.singleUser.handle !== undefined ) {
            content = (
                <React.Fragment>
                <Card className={classes.card} style={{top: `47%`}}>
                    <Grid item container style={{height: '100%'}} direction="column">
                        <Grid item container align="center" style={{borderBottom: '1px solid'}}>
                            <Grid item style={{margin: '1em'}}>
                                <Avatar alt="your avatar" src={this.props.singleUser.imageUrl} className={classes.avatar} />
                            </Grid>
                            <Grid item style={{marginTop: '1em'}}>
                                <Typography variant="body1" className={classes.name}>
                                    {this.props.singleUser.handle}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid item style={{height: '64%'}}>
                            abc
                        </Grid>
                        <Grid item>
                            <CssTextField 
                                name="body"
                                type="text"
                                label="body"
                                multiline
                                rows="1"
                                variant="outlined"
                                className={classes.input}
                                value={this.state.body}
                                onChange={this.onChange}
                                fullWidth
                            />
                            <Button 
                                onClick={this.handleSubmit} 
                                className={classes.EmojiButton}
                                style={{marginLeft: '0.5em'}}>
                                    <i className="far fa-paper-plane"></i>
                        </Button>
                        </Grid>
                    </Grid>
                </Card>
                </React.Fragment>
            );
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
    loading: state.UI.loading
})

export default connect(mapStateToProps)(withStyles(styles)(Chatbox));
