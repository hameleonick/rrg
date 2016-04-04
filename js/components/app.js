import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Options from '../containers/options'
import { OPTIONS_PAGE, MODE_PAGE, GAME_PAGE, CHANGE_GAME_PAGE} from '../constants/pages'


class App extends Component {

	returnCurrentPage(){
		if(this.props.currentPage == OPTIONS_PAGE)
			return <Options />
		else
			return "PAGE DOES NOT EXIST";
	}	


	render(){
		const {currentPage} = this.props;
		console.log(currentPage)
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
    currentPage: state.pages.currentPage,
    pages: state.pages.pages.toJS()
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