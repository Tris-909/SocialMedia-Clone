import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';
import {Link} from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';

import {connect} from 'react-redux';
import {loginUser} from '../redux/actions/userAction';

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

const styles = {
    form: {
        textAlign: 'center'
    },
    container: {
        padding: '3em 4em 4em 4em',
        border: '3px solid rgba(0, 0, 0, 0.12)'
    },
    submitButton: {
        marginTop: '3em',
        backgroundColor: '#33312a',
        color: 'white',
        '&:hover' : {
            color: '#33312a',
            backgroundColor: 'white'
        }
    },
    TextField: {
        margin: '1.5em 0em 1em 0em',
    },
    customError: {
        color: '#e02702',
        marginTop: '1em',
        fontWeight: 400,
        fontSize: '1rem'
    },
    signupText: {
        marginTop: '2em',
        fontSize: '1rem'
    },
    input: {
        color: '#33312a',
        '&:focus' : {
            color: '#33312a'
        },
        '&:actived' : {
            color: '#33312a'
        }
    },
    textfieldFocus: {
        color:  '#33312a'
    },
    link: {
        fontWeight: 'bold',
        color: '#33c9dc',
        '&:visited': {
            color: '#33312a'
        }
    }
}

export class login extends Component {
    state = {
        email: '',
        password: '',
        error: {}
    }

    componentWillReceiveProps(nextsProps){
        if (nextsProps.UI.errors) {
            this.setState({ error: nextsProps.UI.errors});
        }
    }

    handlerChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handlerSubmit = (event) => {
        event.preventDefault();
        const userData = {
            email: this.state.email,
            password: this.state.password
        }
        this.props.loginUser(userData, this.props.history);
    }

    render() {
        const {classes, UI: {loading} } = this.props;
        const {error } = this.state;
        return (
            <Paper variant="outlined" className={classes.container}> 
            <Grid container className={classes.form}>
                <Grid item sm></Grid>
                <Grid item sm>
                    <Typography variant="h3" className={classes.pageTitle}>
                        Login
                    </Typography>
                    <form noValidate onSubmit={this.handlerSubmit}>
                        <CssTextField 
                            id="email" 
                            name="email" 
                            type="email" 
                            helperText={error.email} 
                            error={error.email ? true : false} 
                            label="Email" 
                            fullWidth 
                            onChange={this.handlerChange} 
                            value={this.state.email} 
                            className={classes.TextField}
                            InputProps={{
                                className: classes.input
                            }} />
                        <CssTextField 
                            id="password" 
                            name="password" 
                            type="password" 
                            helperText={error.password} 
                            error={error.password ? true : false} 
                            label="Password" 
                            fullWidth 
                            onChange={this.handlerChange} 
                            value={this.state.password} 
                            autoFocus
                            InputProps={{
                                className: classes.input,
                            }} />
                        {error.general && (<Typography variant="body2" className={classes.customError}>{error.general}</Typography>)}
                        <Button 
                            type="submit" 
                            variant="contained" 
                            className={classes.submitButton}>
                                {loading ? <CircularProgress color="white"/> : "Submit"}
                        </Button>
                    </form>
                    <br />
                    <small className={classes.signupText}>
                        Create an account <Link to="/signup" className={classes.link}> here </Link>
                    </small>
                </Grid>
                <Grid item sm></Grid>
            </Grid>
            </Paper>
        )
    }
}

const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
});

const mapActionToProps = {
    loginUser
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(login));
