//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import * as Animatable from 'react-native-animatable';

const width = Dimensions.get('window').width;
const LaunchLogo = require('../../assets/launchLogo.png');

// create a component
class LaunchScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            launchMode:true
        };
    }
    componentDidMount() {
        this.props.navigation.addListener('focus', () => {
            if(!this.state.launchMode){
                this.props.navigation.navigate("Drawer");
            }else{
                setTimeout(() => {
                    this.setState({launchMode:false});
                    this.props.navigation.navigate("Drawer");
                }, 3000);
            }
        })
    }
    render() {
        return (
            <View style={styles.container}>
                <Animatable.Image
                style={{width:width*0.5}}
                resizeMode="contain"
                source={LaunchLogo}
                animation="pulse" easing="ease-out" iterationCount="infinite">
                </Animatable.Image>
            </View>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#050505',
    },
});

//make this component available to the app
export default LaunchScreen;
