import React, { PropTypes, Component } from 'react'
import {StringLocalisation} from '../helpers'

class GameMessage extends Component {

  render() {
    const {text, id, lang} = this.props;
    return (
      <div>
        {StringLocalisation(text, lang)}
      </div>
    )
  }
}

GameMessage.propTypes = {
  
}

export default GameMessage
