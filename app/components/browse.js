'use strict';

var React = require('react-native');
var Api = require('../utilities/api');
var Company = require('./company');
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
			companies: ds.cloneWithRows(this.props.companies)
		}
	},

	componentDidMount: function() {
		
	},

	goBack: function() {
		this.props.navigator.pop();
	},

	viewCompany: function(company) {
	
		return function() {
			this.props.navigator.push({
				title: company.name,
				component: Company,
				passProps: {
					company: company
				}
			});
		}.bind(this)
	},

	overView: function(overview) {
		overview = overview || 'Learn more...';
		return overview.length > 55 ? overview.substr(0, 55) + '...' : overview;
	},
					  	
	renderRow: function(company) {


		return (		
				<TouchableHighlight
				    onPress={this.viewCompany(company)}
				    underlayColor="#eee">
						<View style={styles.row}>
							<Icon
							  name={company.faicon}
							  size={40}
							  color='#ddd'
							  style={styles.fontIcon}
						  	/>
					  		<View style={styles.rowBody}>
						  		<Text style={styles.title}>{company.name}</Text>
						  		<Text style={styles.text}>{this.overView(company.overview)}</Text>
					  		</View>
				  		</View>
				</TouchableHighlight>
		)
	},

	render: function() {

		return (
				<ListView
				  dataSource={this.state.companies}
				  renderRow={ this.renderRow}
			  	/>
		)
		
	}

});

module.exports = Browse;