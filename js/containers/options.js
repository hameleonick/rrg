import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as OptionActions from '../actions/options'
import * as PagesActions from '../actions/pages'
import * as PagesConstants from '../constants/pages'
import {StringLocalisation} from '../helpers'

class Options extends Component {

	constructor(){
		super();
		
	}


	render(){

		const {sound, fastMode, actions, pagesActions, lang, languagesList} = this.props;

		return (
				<ul>
					<li><input type="checkbox" checked={sound}  onChange={()=>actions.ToggleSound(!sound)} />{StringLocalisation('SOUND', lang)}</li>
					<li><input type="checkbox" checked={fastMode} onChange={()=>actions.ToggleFastMode(!fastMode)} />{StringLocalisation('FAST_MODE', lang)}</li>
					<li>{StringLocalisation('CHOOSE_LANGUAGE', lang)}
						<ul>
							{languagesList.map((language, id)=>{
								let checked = false;
								if(language == lang){
									checked = true;
								}
       						    return <li key={id}><input type="radio" checked={checked} onChange={()=>{actions.ChangeLanguage(language)}} name="language" value="language" />{language}</li>
        					})}
							
						</ul>
					</li>
					<li><input type="button" value={StringLocalisation('BACK', lang)} onClick={()=>   pagesActions.ChangeCurrentPage(PagesConstants.MODE_PAGE) } /></li>
				</ul>

			)	


	}

}

Options.propTypes = {
  sound: PropTypes.bool,
  fastMode: PropTypes.bool,
  lang: PropTypes.string,
  languagesList: PropTypes.object
}

function mapStateToProps(state, ownProps) {
  return {
    sound: state.getIn(['options', 'sound']),
    fastMode: state.getIn(['options', 'fastMode']),
    lang: state.getIn(['options','currentLanguage']),
    languagesList: state.getIn(['options', 'languagesList'])
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(OptionActions, dispatch),
    pagesActions: bindActionCreators(PagesActions, dispatch)
  }
}
/*


<li><input type="radio" name="language" value="EN" />EN</li>
							<li><input type="radio" name="language" value="RU" />Рус</li>
							<li><input type="radio" name="language" value="UA" />Укр</li>

*/
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Options)