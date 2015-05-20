'use strict';

var React = require('react-native');
var Api = require('../utilities/api');

var {
	View,
	Text,
	StyleSheet,
	Image,
	TouchableHighlight,
	ListView,
	ActivityIndicatorIOS
} = React;

var styles = StyleSheet.create({
	// mainContainer: {
	// 	flex: 1,
	// 	padding: 30,
	// 	marginTop: 65,
	// 	flexDirection: 'column',
	// 	justifyContent: 'center',
	// 	backgroundColor: '#48BBEC'
	// },
	container: {
		flex: 1,
		// display: 'flex',
		// flexDirection: 'column',
		backgroundColor: 'orange'
	},  
	containerOne: {
	
		backgroundColor: 'blue', 
		flex: 1,
		marginBottom: 15

	},
	containerTwo: {
	
		backgroundColor: 'red',
		flex: 1,

	},
	map: {
		marginTop: 65,
		backgroundColor: 'blue',
		flex: 1
	},
	buttonText: {
		fontSize: 24,
		color: 'red',
		alignSelf: 'center',
		marginTop: 65
	},
	button: {
		// flexDirection: 'row',
		// alignSelf: 'stretch',
		// justifyContent: 'center',
	    // flex: 1,
	    // padding: 20,
	    // backgroundColor: '#eeeeee'
	},
	colorsBlue: {
		backgroundColor: '#48BBEC'
	},
	colorsGold: {
		backgroundColor: '#FCC510'
	},
	colorsBrown: {
		backgroundColor: '#753E17'
	}, 
	centering: {
    	alignItems: 'center',
   	 	justifyContent: 'center',
   	 	backgroundColor: '#eee',
   	 	height: 80,
   	 	flex: 1
  },
  row: {
  	height: 70,
  	padding: 5,
  	borderBottomWidth: 2,
  	borderBottomColor: '#eee',
  	flexDirection: 'row'
  },
  rowBody: {
  	flex: 4
  },
  title: {
  	fontSize: 20,
  	color: '#2093bb'
  },
  text : {
  	overflow: 'hidden',
  	paddingBottom: 5,
  	color: '#555555'
  },
  icon: {
  	flex: 1,
  	color: '#ddd'
  }

});

var LANGUAGES = [];

var HOST_URL = 'http://webdevphoenix.com';

var Browse = React.createClass({

	getInitialState: function(props) {
		return {
			company: this.props.company,
			isLoading: true
		}
	},

	componentDidMount: function() {
		
	},



	render: function() {
	
		return (
	
		      <Text style={styles.buttonText}>{this.state.company}</Text>
			
	
		);
		
	}

});

module.exports = Browse;