import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as ModeActions from '../actions/mode'
import * as PagesActions from '../actions/pages'
import * as PagesConstants from '../constants/pages'
import {StringLocalisation} from '../helpers'

class Mode extends Component {

	constructor(){
		super();
		
	}

	render(){

		const {pagesActions, lang, showOptionSection} =  this.props;
		
		return (
			<div className="mode_container">
				<div className="logo">{StringLocalisation('GAME_LOGO', lang)}</div>
			 	<input className="play_btn" type='button' value={StringLocalisation('NEW_GAME', lang)} onClick={()=>{pagesActions.ChangeCurrentPage(PagesConstants.GAME_PAGE)}} />
				<div style={{display: "none"}}>{StringLocalisation('CONTINUE_GAME', lang)}</div>
				<i className="fa fa-cog options" onClick={()=>{pagesActions.ShowOptionsSection()}}></i>
			</div>
			);
		
	}

}

Mode.propTypes = {
	lang: PropTypes.string
}

function mapStateToProps(state, ownProps) {

  return {
    lang: state.getIn(['options','currentLanguage'])
  }
}

function mapDispatchToProps(dispatch) {
 	return {
 		actionsMode: bindActionCreators(ModeActions, dispatch),
 		pagesActions: bindActionCreators(PagesActions, dispatch),
 	}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Mode)