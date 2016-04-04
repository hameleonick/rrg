import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Options from '../containers/options'
import Mode from '../containers/mode'
import Game from '../containers/game'
import { OPTIONS_PAGE, MODE_PAGE, GAME_PAGE} from '../constants/pages'


class App extends Component {

	returnCurrentPage(){

		console.log(this.props)
		if(this.props.currentPage == OPTIONS_PAGE)
			return <Options />
		else if(this.props.currentPage == MODE_PAGE)
			return <Mode />
		else if(this.props.currentPage == GAME_PAGE)
			return <Game />	
		else	
			return "PAGE DOES NOT EXIST";
	}	


	render(){
		const {currentPage} = this.props;
		
		return (

				<div>
					{this.returnCurrentPage()}
				  </div>
			);
	}
}

App.propTypes = {
  currentPage: PropTypes.string,
  pages: PropTypes.array
}

function mapStateToProps(state, ownProps) {

  return {
    currentPage: state.getIn(['pages','currentPage'])
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: ()=>{}//bindActionCreators(CommonActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)