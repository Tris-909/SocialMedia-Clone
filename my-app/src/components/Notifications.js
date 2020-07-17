import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import Button from '@material-ui/core/Button';

import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatIcon from '@material-ui/icons/Chat';

import {connect} from 'react-redux';
import { markNotificationsRead } from '../redux/actions/userAction';

class Notifications extends Component {
    state = {
        anchorEl: null
    }

    handleOpen = (event) => {
        this.setState({
            anchorEl:  event.target
        });
    }

    handleClose = () => {
        this.setState({
            anchorEl: null 
        });
    }

    onMenuOpened = () => {
        let unreadNotificationsIds = this.props.notifications.filter(not => !not.read).map(not => not.notificationID);
        this.props.markNotificationsRead(unreadNotificationsIds);
    }

    render() {
        const notifications = this.props.notifications;
        const anchorEl = this.state.anchorEl;

        dayjs.extend(relativeTime);

        let notificationIcon;
        if (notifications && notifications.length > 0) {
            notifications.filter(not => not.read === false).length > 0 ? 
            (notificationIcon = (
                <Badge badgeContent={notifications.filter(not => not.read === false).length} color="error">
                    <i className="fas fa-bell"></i>
                </Badge>
            )) : (
                notificationIcon = (
                    <i className="fas fa-bell"></i>
                )
            )
        } else {
            notificationIcon = (
                   <i className="fas fa-bell"></i>
            );
        }

        let notificationsMarkUp = 
            (notifications && notifications.length > 0) ? (
                notifications.map(not => {
                    const text = not.type === 'like' ? 'liked' : 'commented on';
                    const time = dayjs(not.createdTime).fromNow();
                    const iconColor = not.read ? 'primary' : 'secondary';
                    const icon = not.type === ('like' || 'likeComment') ? (
                        <FavoriteIcon color={iconColor} style={{marginRight: '1em'}} />
                    ) : (
                        <ChatIcon color={iconColor} style={{marginRight: '1em'}} />
                    )

                    return (
                        <MenuItem key={not.createdTime} onClick={this.handleClose}>
                            {icon}
                            <Typography component={Link} style={{color: 'black'}} color="black" variant="body1" to={`/profile/${not.recipient}/post/${not.postID}`}>
                                {not.sender} {text} your {not.type === 'likeComment' ? 'comment' : 'post'} {time}
                            </Typography>
                        </MenuItem>
                    )
                })
            ) : (
                <MenuItem onClick={this.handleClose}>
                    You have no notifications
                </MenuItem>
            )

        return(
            <React.Fragment>
                <Tooltip title="Notifications" placement="bottom">
                    <Button aria-owns={anchorEl ? 'simple-menu' : undefined} color="inherit" style={{fontSize: '1.25rem'}} aria-haspopup="true" onClick={this.handleOpen}>
                        {notificationIcon}
                    </Button>
                </Tooltip>
                <Menu disableScrollLock={true} anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={this.handleClose} onEntered={this.onMenuOpened}>
                    {notificationsMarkUp}
                </Menu>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    notifications: state.user.notifications
})


export default connect(mapStateToProps, {markNotificationsRead})(Notifications);