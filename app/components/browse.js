'use strict';

var React = require('react-native');
var Api = require('../utilities/api');
var Company = require('./company');
var Icon = require('FAKIconImage');
var approvedIcons = require('../assets/approved-icons.json');
console.log(approvedIcons);

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
		color: 'white',
		alignSelf: 'center'
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
  },
  fontIcon: {
  	height: 50,
  	width: 50
  }

});

// move to utilities class;
function convertCamel (input) { 
	return input.replace(/(\-[a-z])/g, function($1){return $1.toUpperCase().replace('-','');});
}

var LANGUAGES = [];
var HOST_URL = 'http://webdevphoenix.com';


var Browse = React.createClass({

	getInitialState: function() {
		console.log('getting')
		return {
			companies: null,
			isLoading: true
		}
	},

	componentDidMount: function() {
		this.fetchData();
	},

	fetchData: function() {
		Api.get('companies')
			.then((companies) => {
		 		var ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2});
				this.setState({
					isLoading: false,
					companies: ds.cloneWithRows(companies)
				});
				console.log('doneLoading');
			});
	},

	goBack: function() {
		this.props.navigator.pop();
	},

	renderSpinner: function() {
		console.log('loading');
		return (
			<ActivityIndicatorIOS
		        animating={this.state.isLoading}
		        style={styles.centering}
		        size="large"/>
		);
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

		// move this to the .then() and massage the data when it arrives.
		var icon = company.faicon ? convertCamel(company.faicon.substr(3)) : 'code';
		company.faicon = (approvedIcons.indexOf(icon) > -1) ? 'fontawesome|'+icon : 'fontawesome|code';

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

		var backButton = (
			<View style={styles.container}>
				<TouchableHighlight
				    style={[styles.button, styles.colorsBlue]}
				    onPress={this.goBack}
				    underlayColor="#88D4F5">
				      <Text style={styles.buttonText}>Back</Text>
				</TouchableHighlight>
				<TouchableHighlight
				    style={[styles.button, styles.colorsBlue]}
				    onPress={this.goBack}
				    underlayColor="#88D4F5">
				      <Text style={styles.buttonText}>Back</Text>
				</TouchableHighlight>
			</View>

		);

		if (this.state.isLoading) {
			return this.renderSpinner();
		}

		return (
	
			
				<ListView
				  dataSource={this.state.companies}
				  renderRow={ this.renderRow}
			  	/>
	
		);
		
	}

});

module.exports = Browse;