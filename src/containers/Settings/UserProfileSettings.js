import React, { Component } from 'react';
import {storeData, getData, clear, USER_PROFILE} from './PersistUserData';
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
  if(stateData.fullName == ""){
      alert("Full Name cannot be empty!");
      return false;
  }
  if(stateData.phone == ""){
      alert("Phone number cannot be empty!");
      return false;
  }
  if(stateData.email == ""){
      alert("Email cannot be empty!\nWe shall send an invoice to your email address");
      return false;
  }
  if(stateData.shippingCountry == ""){
    alert("Please enter your country where items will be shipped");
    return false;
  }
  if(stateData.shippingAddress == ""){
    alert("Please enter address where items will be shipped");
    return false;
  }
  if(stateData.password == "" && stateData.userId == ""){
    alert("Password cannot be null");
    return false;
  }
  return true;
}

// create a component
class UserProfileSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
        userId:"",
        fullName: "",
        phone: "",
        email: "",
        password: "",
        shippingCountry: "",
        shippingAddress: "",
        inProgress: false
    };
  }

  componentDidMount(){
    getData(USER_PROFILE)
    .then(data => {
      this.setState({
        fullName: data.fullName,
        phone: data.phone,
        email: data.email,
        userId: data.userId,
        shippingCountry: data.shippingCountry,
        shippingAddress: data.shippingAddress
      })
    })
    .catch(error => console.log(error))
  }

  saveUserData = (stateData) => {
    if(isValidStateIput(stateData)){
      this.setState({inProgress:true})
      UserAPI.Post(stateData)
      .then(data => {
          if(data.body.userId != null){
              storeData(USER_PROFILE, data.body)
              .then(() => {
                this.setState({inProgress:false});;
                alert("User profile saved");
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

  logOut = () => {
    clear()
    .then(() => {
      this.props.navigation.navigate("Home")
    }).catch(err => alert("Error logging out"))
  }

  render() {
    return (
      <ScrollView showsVerticalScrollIndicator={false} style={{padding:10,marginTop:height*0.02}}>
        <Text style={[mainStyles.TextRegular,{marginBottom:10}]}>User Info.</Text>
        <ProgressLoader inProgress={this.state.inProgress} />
        <Item>
            <Icon active name='user' size={25} />
            <Input 
            value={this.state.fullName}
            onChangeText={text => this.setState({fullName:text})}
            style={{paddingLeft:20}} 
            placeholder='Full name'/>
          </Item>
          <Item>
              <Icon active name='phone' size={25} />
              <Input 
              value={this.state.phone}
              onChangeText={text => this.setState({phone:text})}
              style={{paddingLeft:20}} 
              placeholder='+25670000000'/>
          </Item>
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
          <Text style={[mainStyles.TextRegular,{marginTop:40,marginBottom:10}]}>Shipping Info.</Text>
          <Item>
              <Icon active name='globe' size={25} />
              <Input
              value={this.state.shippingCountry}
              onChangeText={text => this.setState({shippingCountry:text})}
              style={{paddingLeft:20}} 
              placeholder='Shipping Country'/>
          </Item>
          <Textarea 
          value={this.state.shippingAddress}
          style={{marginTop:20}}
          onChangeText={text => this.setState({shippingAddress:text})}
          rowSpan={5} bordered placeholder="Shipping Address" />
          <Button
          style={{backgroundColor:"#212121",marginTop:height*0.04}}
          onPress={() => this.saveUserData(this.state)}
          block
          >
            <Text style={[{color:'#fff',paddingRight:15},mainStyles.ButtonTitle]}>edit my profile</Text>
            <Icon name="edit" size={22} color="#fff" />
          </Button>
          {this.state.userId != "" && <TouchableOpacity onPress={() => this.logOut()}><Text style={[mainStyles.ButtonTitle,{textAlign:'center', marginTop:20,paddingBottom:40}]}>LogOut</Text></TouchableOpacity>}
      </ScrollView>
    );
  }
}

// define your styles
const styles = StyleSheet.create({

});

//make this component available to the app
export default UserProfileSettings;
