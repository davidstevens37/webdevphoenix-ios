'use strict';

var React = require('react-native');
var Api = require('../utilities/api');
var Browse = require('./browse')

var {
	View,
	Text,
	StyleSheet,
	Image,
	TouchableHighlight,
	NavigatorIOS
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
	}

});

var Main = React.createClass({

	getInitialState: function() {
		return {
			companies: null
		}
	},

	componentDidMount: function() {
		this.fetchData();
	},

	fetchData: function() {
		// Api.get('all', this);
	},

	browseAll: function() {
		this.changeView({type: 'All'});
	},
	browseLocation: function() {
		this.changeView({type: 'Location'});

	},
	browseLanguage: function() {
		this.changeView({type: 'Language'});
	},

	changeView: function(obj) {

		this.props.navigator.push({
			title: 'Browse ' + obj.type,
			component: Browse,
			passProps: {browseBy: obj.type}
		});
	},

	render: function() {

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
	},

	renderLoadingView: function() {
		return (
			<View style={styles.mainContainer}>
				<Text> Loading Companies... </Text>
			</View>
		);
	}

});

module.exports = Main;