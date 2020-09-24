import React, { Component } from 'react';
import {storeData, getData, USER_PROFILE} from './PersistUserData';
import { View, Text, StyleSheet, Dimensions,ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import {Item, Input, Button, Label, Textarea} from 'native-base';
import Icon from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import mainStyles from '../../shared/mainStyles';
import ProgressLoader from '../../components/ProgressLoader';
import UserAPI from '../../services/UserAPI';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const isValidStateIput = stateData => {
    if(stateData.email == ""){
        alert("Email cannot be empty");
        return false;
    }
    if(stateData.password == ""){
      alert("Password cannot be empty");
      return false;
    }
    return true;
  }

// create a component
class ExistingUserLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            inProgress: false
        };
    }

    loadUserData = (stateData) => {
        if(isValidStateIput(stateData)){
            this.setState({inProgress:true})
            var userObject = {
                email: stateData.email,
                password: stateData.password
            }
            UserAPI.Post(userObject)
            .then(data => {
                if(data.body.userId != null){
                    storeData(USER_PROFILE, data.body)
                    .then(() => {
                        this.props.navigation.navigate("UserProfileSettings")
                    })
                    .catch(() => alert("Error saving user profile"))
                }else{
                    alert(data.body)
                    this.setState({inProgress:false});
                }
            })
            .catch(error => {
                this.setState({inProgress:false});
                alert(error);
            })
        }
    }


    render() {
        return (
            <View style={{padding:10,marginTop:height*0.1}}>
                <ProgressLoader inProgress={this.state.inProgress} />
                <Item>
                    <Icon active name='mail' size={25} />
                    <Input 
                    value={this.state.email}
                    keyboardType="email-address"
                    onChangeText={text => this.setState({email:text})}
                    style={{paddingLeft:20}} 
                    placeholder='example@email.com'/>
                </Item>
                <Item>
                    <MaterialCommunityIcons active name='eye-off' size={25} />
                    <Input 
                    value={this.state.password}
                    secureTextEntry={true}
                    onChangeText={text => this.setState({password:text})}
                    style={{paddingLeft:20}} 
                    placeholder='Password'/>
                </Item>
                <Button
                style={{backgroundColor:"#212121",marginTop:height*0.04}}
                onPress={() => this.loadUserData(this.state)}
                block
                >
                    <Text style={[{color:'#fff',paddingRight:15},mainStyles.ButtonTitle]}>LOAD MY PROFILE</Text>
                    <Icon name="save" size={22} color="#fff" />
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
        backgroundColor: '#2c3e50',
    },
});

//make this component available to the app
export default ExistingUserLogin;
