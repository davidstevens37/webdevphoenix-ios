'use strict';

var React = require('react-native');
var Api = require('../utilities/api');
var Browse = require('./browse');
var Icon = require('FAKIconImage');
var approvedIcons = require('../assets/approved-icons.json');


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
	container: {
		flex: 1,
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
		color: 'white',
		alignSelf: 'center'
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
  },
  fontIcon: {
  	height: 50,
  	width: 50
  }

});


var Browse = React.createClass({

	getInitialState: function() {
 		var ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2});
		return {
			languages: ds.cloneWithRows(this.props.languages),
			companies: this.props.companies
		}
	},

	componentDidMount: function() {
		
	},

	goBack: function() {
		this.props.navigator.pop();
	},

	browseCompanies: function(language) {
	
		return function() {
			this.props.navigator.push({
				title: language.title,
				component: Browse,
				passProps: {
					data: companies
				}
			});
		}.bind(this)
	},
					  	
	renderRow: function(language) {

		return (		
				<TouchableHighlight
				    onPress={this.browseCompanies(language)}
				    underlayColor="#eee">
						<View style={styles.row}>
					  		<View style={styles.rowBody}>
						  		<Text style={styles.title}>{language.title}</Text>
					  		</View>
				  		</View>
				</TouchableHighlight>
		)
	},

	render: function() {

		return (
				<ListView
				  dataSource={this.state.languages}
				  renderRow={ this.renderRow}
			  	/>
		)
		
	}

});

module.exports = Browse;