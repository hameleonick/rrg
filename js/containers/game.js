import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as GameActions from '../actions/game'
import * as GameConstants from '../constants/game'
import {StringLocalisation} from '../helpers'
import GameMessage from "../components/gameMessage"
import ActionButtons from "../components/actionButtons"
import Immutable from "Immutable"
import ReactIScroll from "react-iscroll"
import iScroll from "iscroll"


class Game extends Component {

	constructor(){
		super();
		this.state = {};
	}

	componentWillMount() {
		
		
	}

	onRefresh(iScrollInstance) {
	  var yScroll = iScrollInstance.y;
	 
	  // console.log("vertical position:" + yScroll)
	 
	  if(this.state.y != yScroll) {
	    this.setState({y: yScroll})
	  }

	  iScrollInstance.scrollTo(0, iScrollInstance.maxScrollY, 500);
	}

	componentDidMount() {
		
		if(!this.props.gameStarted || !this.props.waitingForAction)
			this.showMessageTillNewAction();
		 // this.showMessageTillNewAction();
	}

	componentWillReceiveProps(nextProps) {
		
	}

	moveForward(value){
		let {actions, defaultTextDelay} = this.props;
		actions.ChangeCurrentState(Immutable.fromJS({area:value.get(0), step:value.get(1), action:value.get(2)}));		
		this.showMessageTillNewAction();
	}

	moveBack(value){
		console.log(1111111);
		console.log(value);
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
let options =  {
        scrollbars: true,
        scrollbars: 'custom',
        fadeScrollbars: true,
        mouseWheel: true,
        bounce: false,
        interactiveScrollbars: true
      }
		let gameData = [];
		let key = 0;
		let flag = {text:false, action:false};
		data.map((object, id)=>{
			if(!gameData[key])
				gameData[key] = [];
			if(object.get("type") == "text"){
				flag.text = true;
				gameData[key].push(object)
			}
			else
			{
				flag.action = true;
				gameData[key].push(object)
			}

			if(flag.action && flag.text){
				key++;
				flag.action = false;
				flag.key = false;
			}
		});

		return (
				<div className="game">
				<ReactIScroll iScroll={iScroll}
                      options={options}
                     onRefresh={this.onRefresh.bind(this)}>
					<div className="message">
					
						{gameData.map((messages, id)=>{
							return (
								<div key={id} className="message_item blue">
									{messages.map((object, id)=>{
										if(object.get("type") == "text"){
											return <GameMessage lang={lang} key={id} text={object.get("value")} />
										}
										else{
											return <ActionButtons completed={object.get("completed")} lang={lang} moveBack={this.moveBack.bind(this)} moveForward={this.moveForward.bind(this)} key={id} buttons={object.get("value")} />
										}
									})}

								</div>
							)				
						})}
						
					</div>
					</ReactIScroll>
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
  	lang: state.getIn(['options','currentLanguage']),
  	gameStarted: state.getIn(['game','gameStarted'])
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