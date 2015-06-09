'use strict';

var React = require('react-native');
var Api = require('../utilities/api');
var Icon = require('FAKIconImage');
var {vw, vh, vmin, vmax} = require('react-native-viewport-units');


var {
	View,
	Text,
	StyleSheet,
	Image,
	TouchableHighlight,
	ListView,
	ActivityIndicatorIOS,
	MapView,
	ScrollView
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
		backgroundColor: '#fff'
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
		// backgroundColor: 'blue',
		// flex: 1
		height: 30*vh
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
		marginTop: 65,
		height: 70,
		padding: 5,
		borderBottomWidth: 2,
		borderBottomColor: '#eee',
		flexDirection: 'row'
	},
	rowItem: {
		justifyContent: 'space-between',
		height: 30,
		padding: 3,
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
	},
	scrollView: {
		// backgroundColor: '#aaa'
	},
	textValues: {
		padding: 10,
		backgroundColor: '#D7F2BE',
		borderRadius: 10,
		margin: 10
	},
	question: {
		color: '#687D54',
		fontSize: 18,
		fontWeight: 'bold'
	},
	answer: {
		color: '#687D54',
	},
	linkTitle: {
		fontSize: 18,
		fontWeight: 'bold',
		color: '#555555',
		fontStyle: 'italic',
		marginTop: 10
	},
	link: {
		flex: 1,
		flexDirection: 'row',
		flexWrap: 'wrap',
		color: '#2093bb',
		marginBottom: 10
	},
	linkList: {
		paddingLeft: 15
	}


});

var HOST_URL = 'http://webdevphoenix.com';

var Browse = React.createClass({

	getInitialState: function(props) {

		return {
			company: this.props.company,
			isLoading: true,
			marker: [{latitude: this.props.company.lat, longitude: this.props.company.lng, title: this.props.company.name, subtitle: this.props.company.size}]
		}
	},

	componentDidMount: function() {
		
	},

	toUpper: function(item){
		return item[0].toUpperCase() + item.slice(1);
	},

	overView: function(overview) {
		overview = overview || 'Learn more...';
		return overview.length > 55 ? overview.substr(0, 55) + '...' : overview;
	},

	formatContent: function(item){
	
		if (typeof item === 'object') {
			item = item.join(', ');
		} else if (item === 'true') {
			item = 'yep';
		} else if (item === 'false') {
			item = 'nope';
		}

		return item;
	},

	render: function() {

		var listArray = ['size', 'devteam', 'startup', 'clientwork', 'recruiter', 'city'];
		var list = listArray.map((item, index) => {

			if (!this.state.company[item].length) {
				return <View key={index}></View>
			} else {
				return (
					<View style={styles.rowItem} key={index} >
						<Text style={styles.question}> {this.toUpper(item) }: </Text><Text style={styles.answer}> {this.formatContent(this.state.company[item])} </Text>
					</View>
				)
			}

		});	

		var linksArray = ['url', 'website', 'careersite'];
		var links = linksArray.map((item, index) => {
			if (this.state.company[item]) {
				return (
					<View>
						<Text style={styles.linkTitle}> {this.toUpper(item)} </Text>
						<Text style={styles.link}> {item === 'url' ? 'http://webdevphoenix.com' + this.state.company[item] : this.state.company[item]} </Text>
					</View>
				)
			}
		});


		if (this.state.company.stack && this.state.company.stack.length) {
			links.push(
				<View>
					<Text style={styles.linkTitle}> Stack </Text>
					<Text style={[styles.link, {color: '#555555'}]}> {this.state.company.stack.join(', ')} </Text>
				</View>
			);
		}
	
		return (
			<View style={styles.container}>
				<View style={styles.row}>
					<Icon
					  name={this.state.company.faicon}
					  size={40}
					  color='#ddd'
					  style={styles.fontIcon} />
			  		<View style={styles.rowBody}>
				  		<Text style={styles.title}>{this.state.company.name}</Text>
				  		<Text style={styles.text}>{this.overView(this.state.company.overview)}</Text>
			  		</View>
		  		</View>
			
				<ScrollView
					onScroll={() => { console.log('onScroll!'); }}
					scrollEventThrottle={200}
					contentInset={{top: -65}}
					style={styles.scrollView}>
					<MapView 
						style={styles.map}
						annotations={this.state.marker}
					></MapView>
						<View style={styles.overviewContainer}>
							<Text style={styles.overview}> Overview</Text>
						</View>
						<View style={styles.textValues}>
							{list}
						</View>
						<View style={styles.linkList}>
							{links}
						</View>
						
				</ScrollView>
			</View>
		
			
	
		);
		
	}

});

module.exports = Browse;