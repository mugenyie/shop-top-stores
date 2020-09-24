import React, { Component } from 'react';
import {storeData, getData, USER_PROFILE} from './PersistUserData';
import { View, Text, StyleSheet, Dimensions,ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import {Item, Input, Button, Label, Textarea} from 'native-base';
import ProgressLoader from '../../components/ProgressLoader';
import mainStyles from '../../shared/mainStyles';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

// create a component
class SettingsScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inProgress: false
        };
    }
    
    componentDidMount(){
        this.setState({inProgress:true})
        getData(USER_PROFILE)
        .then(data => {
            if(data != null){
                this.setState({inProgress:false})
                this.props.navigation.navigate("UserProfileSettings")
            }else{
                this.setState({inProgress:false})
            }
        })
        .catch(err => {
            this.setState({inProgress:false})
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <ProgressLoader inProgress={this.state.inProgress}/>
                <Button
                onPress={() => this.props.navigation.navigate("ExistingProfile")}
                block
                style={{width:width*0.8,alignSelf:'center',marginTop:20,backgroundColor:"#212121",borderRadius:0}}
                >
                    <Text style={[{color:'#fff', paddingRight:10},mainStyles.ButtonTitle]}>existing user</Text>
                </Button>
                <Button
                onPress={() => this.props.navigation.navigate("UserProfileSettings")}
                block
                style={{width:width*0.8,alignSelf:'center',marginTop:40,backgroundColor:"#212121",borderRadius:0}}
                >
                    <Text style={[{color:'#fff', paddingRight:10},mainStyles.ButtonTitle]}>new user</Text>
                </Button>
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
    },
});

//make this component available to the app
export default SettingsScreen;