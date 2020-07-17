import React, { Component } from 'react'

//** MATERIAL-UI */
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

//** REDUX STORE */
import {connect} from 'react-redux';
import {deletePost} from '../../redux/actions/dataAction';

export class DeleteButton extends Component {
    state = {
        open: false
    }
    handleClickOpen = () => {
        this.setState({open: true});
    }
    handleClickClose = () => {
        this.setState({open: false});
    }
    deletePost = () => {
        this.props.deletePost(this.props.thisPostID);
    }

    render() {    
        return(
            <React.Fragment>
            <Button style={{fontSize: '1.5em'}} onClick={this.handleClickOpen}>
                <i className="fas fa-trash"></i>
            </Button>
                
            <Dialog open={this.state.open} onClose={this.handleClickClose}>
                <DialogTitle>Delete Post ?</DialogTitle>
                <DialogContent>
                    If you delete this post, you will never get it back.
                </DialogContent>
                <DialogActions>
                    <Grid container justify="space-between" align="center">
                        <Grid item>
                            <Button onClick={this.handleClickClose}>CANCEL</Button>
                        </Grid>
                        <Grid item>
                            <Button onClick={() => {this.deletePost(); this.handleClickClose();}}>DELETE</Button>
                        </Grid>
                    </Grid>
                </DialogActions>
            </Dialog>
            </React.Fragment>

        );
    }
} 

const mapActionToProps = {
    deletePost
}

export default connect(null, mapActionToProps)(DeleteButton);