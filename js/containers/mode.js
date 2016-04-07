import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as ModeActions from '../actions/mode'
import * as PagesActions from '../actions/pages'
import * as GameActions from '../actions/game'
import * as PagesConstants from '../constants/pages'
import {StringLocalisation} from '../helpers'

class Mode extends Component {

	constructor(){
		super();
		
	}

	startNewGame(){
		this.props.gameActions.ResetGameProgress(true);
		this.props.pagesActions.ChangeCurrentPage(PagesConstants.GAME_PAGE);
	}

	render(){

		const {pagesActions, lang, gameStarted} =  this.props;
		let continueBtn = null;
		if(gameStarted)
			continueBtn = (<input className="mode_btn continue_btn" type='button' value={StringLocalisation('CONTINUE_GAME', lang)} onClick={()=>{pagesActions.ChangeCurrentPage(PagesConstants.GAME_PAGE)}} />);
		return (
			<div className="mode_container">
				<div className="logo">{StringLocalisation('GAME_LOGO', lang)}</div>
			 	<input className="mode_btn play_btn" type='button' value={StringLocalisation('NEW_GAME', lang)} onClick={()=>{this.startNewGame()}} />
			 	{continueBtn}
				<i className="fa fa-cog options" onClick={()=>{pagesActions.ShowOptionsSection()}}></i>
			</div>
			);
		
	}

}

Mode.propTypes = {
	lang: PropTypes.string,
	gameStarted:PropTypes.bool
}

function mapStateToProps(state, ownProps) {

  return {
    lang: state.getIn(['options','currentLanguage']),
    gameStarted: state.getIn(['game','gameStarted'])
  }
}

function mapDispatchToProps(dispatch) {
 	return {
 		actionsMode: bindActionCreators(ModeActions, dispatch),
 		pagesActions: bindActionCreators(PagesActions, dispatch),
 		gameActions: bindActionCreators(GameActions, dispatch)
 	}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Mode)