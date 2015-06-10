'use strict';

var React = require('react-native');
var Api = require('../utilities/api');
var Browse = require('./browse');
var Languages = require('./languages');
var Locations = require('./locations');
var approvedIcons = require('../assets/approved-icons.json');


var {
	View,
	Text,
	StyleSheet,
	Image,
	TouchableHighlight,
	NavigatorIOS,
	ActivityIndicatorIOS
} = React;

var styles = StyleSheet.create({
	container: {
		marginTop: 65,
		flex: 1
	},  
	image: {
	    flex: 5
	},
	buttonText: {
		fontSize: 24,
		color: 'white',
		alignSelf: 'center'
	},
	button: {
		flexDirection: 'row',
		alignSelf: 'stretch',
		justifyContent: 'center',
	    flex: 1,
	    // padding: 20,
	    backgroundColor: '#eeeeee'
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
	headerDropShadow: {
		backgroundColor: '#CB7704',
		marginTop: 30,
		margin: 20,
		transform: [{translateX: 5}, {translateY: 5}],
		borderRadius: 10,
		position: 'relative'
	},
	header: {
		// transform: [{translateX: -8}, {translateY: -8}],
		top: -8,
		left: -8,
		backgroundColor: '#FCC510',
		padding: 20,
		borderRadius: 10,
	},
	headerText: {
		fontSize: 28,
		fontWeight: '200'
	},
	caret: {
		backgroundColor: '#FCC510',
		height: 20,
		width: 20,
		transform: [{rotate: '45deg'}],
		bottom: -2,
		left: 46,
		position: 'absolute'
	},
	caretDropShadow: {
		height: 20,
		width: 20,
		backgroundColor: '#CB7704',
		transform: [{rotate: '45deg'}],
		bottom: -8,
		left: 50,
		position: 'absolute'
	},
	centering: {
    	alignItems: 'center',
   	 	justifyContent: 'center',
   	 	// backgroundColor: '#eee',
   	 	height: 80,
   	 	flex: 1
  },

});

// move to utilities class;
function convertCamel (input) { 
	return input.replace(/(\-[a-z])/g, function($1){return $1.toUpperCase().replace('-','');});
}
function convertLowerPluralize (input) {
	var s = input[input.length -1] === 's' ? '' : 's'
	return input[0].toLowerCase() + input.slice(1) + s;
}

var Main = React.createClass({

	getInitialState: function() {
		return {
			isLoading: true
		}
	},

	componentDidMount: function() {
		this.fetchData();
	},

	fetchData: function() {
		console.log('fetching');
		Api.get('all')
			.then((data) => {

				for (var i in data.companies) {
					var icon = data.companies[i].faicon ? convertCamel(data.companies[i].faicon.substr(3)) : 'code';
					data.companies[i].faicon = (approvedIcons.indexOf(icon) > -1) ? 'fontawesome|'+icon : 'fontawesome|code';
				}

				this.setState({
					isLoading: false,
					companies: data.companies,
					languages: data.languages,
					locations: data.locations
				});

			});
	},

	browseAll: function() {
		this.props.navigator.push({
			title: 'All Companies',
			component: Browse,
			passProps: {
				companies: this.state.companies
			}
		});
	},
	browseLocation: function() {
		this.props.navigator.push({
			title: 'Browse Locations',
			component: Locations,
			passProps: {
				companies: this.state.companies,
				locations: this.state.locations
			}
		});

	},
	browseLanguage: function() {
		this.props.navigator.push({
			title: 'Browse Languages',
			component: Languages,
			passProps: {
				languages: this.state.languages,
				companies: this.state.companies
			}
		});
	},
	render: function() {

		if (this.state.isLoading) {
			return (
				<View style={styles.container}>
					<Image source={{uri: 'http://webdevphoenix.com/images/bg.jpg'}} style={styles.image}>
						<View style={styles.headerDropShadow}>
							<View style={styles.header}>
								<Text style={styles.headerText}>Discover companies in Phoenix that hire web developers.</Text>
						<ActivityIndicatorIOS
					        animating={this.state.isLoading}
					        style={styles.centering}
					        size="large"/>
							</View>
						<View style={styles.caretDropShadow}></View>
						<View style={styles.caret}></View>
						</View>
					</Image>
				</View>
			)
		}

		return (
			<View style={styles.container}>
				<Image source={{uri: 'http://webdevphoenix.com/images/bg.jpg'}} style={styles.image}>
					<View style={styles.headerDropShadow}>
						<View style={styles.header}>
							<Text style={styles.headerText}>Discover companies in Phoenix that hire web developers.</Text>
						</View>
					<View style={styles.caretDropShadow}></View>
					<View style={styles.caret}></View>
					</View>
				</Image>
		
				<TouchableHighlight
				    style={[styles.button, styles.colorsBlue]}
				    onPress={this.browseAll}
				    underlayColor="#88D4F5">
				      <Text style={styles.buttonText}>Browse All Companies</Text>
				</TouchableHighlight>
				<TouchableHighlight
				    style={[styles.button, styles.colorsGold]}
				    onPress={this.browseLanguage}
				    underlayColor="#FEF045">
				      <Text style={styles.buttonText}>Browse By Language</Text>
				</TouchableHighlight>
				<TouchableHighlight
				    style={[styles.button, styles.colorsBrown]}
				    onPress={this.browseLocation}
				    underlayColor="#B56822">
				      <Text style={styles.buttonText}>Browse By Location</Text>
				</TouchableHighlight>
			</View>
		);
	}

});

module.exports = Main;