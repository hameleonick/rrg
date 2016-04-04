import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as GameActions from '../actions/game'
import * as GameConstants from '../constants/game'
import {StringLocalisation} from '../helpers'
import GameMessage from "../components/gameMessage"
import ActionButtons from "../components/actionButtons"
import Immutable from "Immutable"

class Game extends Component {

	constructor(){
		super();
		this.state = {};
	}

	componentWillMount() {

		this.showMessageTillNewAction(true);
	}

	componentDidMount() {

		 // this.showMessageTillNewAction();
	}

	componentWillReceiveProps(nextProps) {

	}

	doAction(value){
		let {actions, defaultTextDelay} = this.props;
		actions.ChangeCurrentState(Immutable.fromJS({area:value.get(0), step:value.get(1), action:value.get(2)}));		
		this.showMessageTillNewAction();
	}

	showMessageTillNewAction(firstTime = false) {

		let {actions, defaultTextDelay} = this.props;
		if(firstTime)
			defaultTextDelay = 0;
		setTimeout(()=>{
			actions.GetNextText(this.props.currentGameState);
			if(!this.props.waitingForAction){
				this.showMessageTillNewAction();
			}
			else{
				actions.GetActionButtons(this.props.currentGameState);
			}
		},defaultTextDelay);

		
	}

	render(){

		const {data,waitingForAction,lang} = this.props;

		let btn = null;
		if(waitingForAction){
			btn =  <input type="button" value="test" />
		}

		return (
				<div>
					{data.map((object, id)=>{
						if(object.get("type") == "text"){
							return <GameMessage lang={lang} key={id} text={object.get("value")} />
						}
						else{
							return <ActionButtons lang={lang} userAction={this.doAction.bind(this)} key={id} buttons={object.get("value")} />
						}
					})}
									
				</div>
			)	


	}

}

Game.propTypes = {
  
}

function mapStateToProps(state, ownProps) {
  return {
  	// gameFlows: state.getIn(['game','gameFlows']),
  	currentGameState: state.getIn(['game','currentGameState']),
  	defaultTextDelay: state.getIn(['game','defaultTextDelay']),
  	fastModeTextDelay: state.getIn(['game','fastModeTextDelay']),
  	data: state.getIn(['game','data']),
  	waitingForAction: state.getIn(['game','waitingForAction']),
  	lang: state.getIn(['options','currentLanguage'])
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(GameActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Game)