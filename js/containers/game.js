import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as GameActions from '../actions/game'
import * as GameConstants from '../constants/game'
import {StringLocalisation} from '../helpers'
import GameMessage from "../components/gameMessage"
import ActionButtons from "../components/actionButtons"

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

	componentWillReceiveProps() {

	}

	doAction(value){
		let {actions, defaultTextDelay} = this.props;
		actions.ChangeCurrentState({area:value[0], step:value[1], action:value[2]});		
		// actions.GetNextText({area:value[0], step:value[1], action:value[2]});
		// console.log(value);
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

		// this.state = this.props;
		const {data,waitingForAction,lang} = this.props;

		// if(!data.length)
		// 	return false;
		

		let btn = null;
		if(waitingForAction){
			btn =  <input type="button" value="test" />
		}

		return (
				<div>
					{data.map((object, id)=>{
						if(object.type == "text"){
							return <GameMessage lang={lang} key={id} text={object.value} />
						}
						else
							return <ActionButtons lang={lang} userAction={this.doAction.bind(this)} key={id} buttons={object.value} />
					})}
									
				</div>
			)	


	}

}

Game.propTypes = {
  
}

function mapStateToProps(state, ownProps) {
  return {
  	gameFlows: state.game.gameFlows,
  	currentGameState: state.game.currentGameState,
  	defaultTextDelay: state.game.defaultTextDelay,
  	fastModeTextDelay: state.game.fastModeTextDelay,
  	data: state.game.data,
  	waitingForAction: state.game.waitingForAction,
  	lang: state.options.currentLanguage
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