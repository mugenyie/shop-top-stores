//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Dimensions } from 'react-native';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

// create a component
class ProgressLoader extends Component {
    render() {
        const {inProgress} = this.props;
        return (
            <>
                {inProgress && (
                <ActivityIndicator 
                style={styles.activityLoader}
                size={width*0.15} color="#212121" />
                )}
            </>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    activityLoader:{
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100,
    }
});

//make this component available to the app
export default ProgressLoader;
