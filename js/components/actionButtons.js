import React, { PropTypes, Component } from 'react'
import {StringLocalisation} from '../helpers'

class ActionButtons extends Component {

  render() {
    const {buttons, userAction, lang} = this.props;
    
    return (
      <div>
        {buttons.map((button,id)=>{
        	return <input disabled={button.get("disabled")} key={id} onClick={()=>{userAction(button.get("value"))}} type="button" value={StringLocalisation(button.get("text"), lang)} />
    	    })
    	}
      </div>
    );
  }
}

ActionButtons.propTypes = {
  
}

export default ActionButtons
