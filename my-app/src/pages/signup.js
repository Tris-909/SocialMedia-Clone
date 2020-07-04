import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';


import {connect} from 'react-redux';
import {signupUser} from '../redux/actions/userAction';

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
    textfieldFocus: {
        color:  '#33312a'
    },
    link: {
        fontWeight: 'bold',
        color: '#33c9dc',
        '&:visited': {
            color: '#33312a'
        }
    },
    TextField: {
        margin: '1.5em 0em 1em 0em'
    },
    submitButton: {
        marginTop: '3em',
        backgroundColor: '#33312a',
        color: 'white',
        '&:hover' : {
            color: '#33312a',
            backgroundColor: 'white'
        }
    }
}

export class signup extends Component {
    state = {
        email: '',
        password: '',
        confirmPassword: '',
        handle: '',
        error: {},
        notMatches: false
    }

    componentWillReceiveProps(nextsProps){
        if (nextsProps.UI.errors) {
            this.setState({ error: nextsProps.UI.errors});
        }
    }

    onChangeHandler = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handlerSubmit = (event) => {
        event.preventDefault();
        this.setState({loading: true});
        const userInput = {
            email: this.state.email,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
            handle: this.state.handle
        }
        if (userInput.password !== userInput.confirmPassword) {
            this.setState({notMatches: true});
            this.setState({loading: false});
            return;
        }
        this.props.signupUser(userInput, this.props.history);
        
    }

    render() {
        const {classes, UI: { loading }} = this.props;
        const {error, notMatches} = this.state;

        return (
            <Paper variant="outlined" className={classes.container}>
                <Grid container className={classes.form}>
                    <Grid item sm />
                    <Grid item sm>
                        <Typography variant="h3" className={classes.pageTitle}>
                            Sign Up 
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
                                onChange={this.onChangeHandler}
                                value={this.state.email}
                                className={classes.TextField}
                                InputProps={{
                                    className: classes.input,
                                }} />
                            <CssTextField 
                                id="password" 
                                name="password" 
                                type="password"
                                helperText={notMatches ? "Your password and confirmPassword didn't match" : "Your password should have at least 6 characters"}
                                error={notMatches ? true : false} 
                                label="Password" 
                                fullWidth
                                onChange={this.onChangeHandler}
                                value={this.state.password}
                                className={classes.TextField}
                                InputProps={{
                                    className: classes.input,
                                }} />
                            <CssTextField 
                                id="confirmPassword" 
                                name="confirmPassword" 
                                type="password"
                                helperText={notMatches ? "Your password and confirmPassword didn't match" : undefined}
                                error={notMatches? true : false} 
                                label="Confirm Password" 
                                fullWidth
                                onChange={this.onChangeHandler}
                                value={this.state.confirmPassword}
                                className={classes.TextField}
                                InputProps={{
                                    className: classes.input,
                                }} />
                            <CssTextField 
                                id="handle" 
                                name="handle" 
                                type="handle"
                                helperText={error.handle}
                                error={error.handle ? true : false} 
                                label="User Name" 
                                fullWidth
                                onChange={this.onChangeHandler}
                                value={this.state.handle}
                                className={classes.TextField}
                                InputProps={{
                                    className: classes.input,
                                }} />
                            {error.general && (<Typography variant="body2" className={classes.customError}>{error.general}</Typography>)}
                            <Button 
                                type="submit" 
                                variant="contained" 
                                className={classes.submitButton}>
                                    {loading ? <CircularProgress /> : "Submit"}
                            </Button>
                        </form>
                    </Grid>
                    <Grid item sm />
                </Grid>
            </Paper>
        );
    }
}

const mapStateToProps = (state) => ({
    user: state.user,
    UI: state.UI
});

const mapActionToProps = {
    signupUser
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(signup));
