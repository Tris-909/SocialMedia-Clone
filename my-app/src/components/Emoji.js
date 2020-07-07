import React, { Component } from 'react'
//Emoji picker
import {Smile} from 'react-feather';
import {Picker} from 'emoji-mart';

import Button from '@material-ui/core/Button';

export class Emoji extends Component {
    state = {
      showEmojiPicker: false
    }
  
    render() {
        return (
            <React.Fragment>
                <Button>
                  <Smile />
                </Button>
            </React.Fragment>
        )
    }
}

export default Emoji
