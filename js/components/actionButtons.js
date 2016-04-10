import React, { PropTypes, Component } from 'react'
import {StringLocalisation} from '../helpers'

class ActionButtons extends Component {

  render() {
    const {buttons, lang, completed} = this.props;
    
    return (
      <div className="buttons_wrapper">
        {buttons.map((button,id)=>{
          const chosen = (completed && button.get('chosen'));
          let userAction = "moveForward";
          if(completed && !button.get('chosen'))
            userAction = "moveBack"
          let chosenAction = ""
          if(chosen)
            chosenAction = "chosenAction"
        	return <input disabled={chosen} className={chosenAction} key={id} onClick={()=>{this.props[userAction](button.get("value"))}} type="button" value={StringLocalisation(button.get("text"), lang)} />
    	    })
    	}
      </div>
    );
  }
}

ActionButtons.propTypes = {
  
}

export default ActionButtons
