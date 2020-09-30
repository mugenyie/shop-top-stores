import React, {Fragment, useEffect, Component} from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import {TouchableOpacity, Image, StyleSheet, View, Platform, StatusBar, Dimensions, Alert} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import SplashScreen from 'react-native-splash-screen';

import firebase from "@react-native-firebase/app";
import messaging from '@react-native-firebase/messaging';

import Icon from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Badge, Text, Button} from 'native-base';
import mainStyles from './src/shared/mainStyles';
import {ShoppinReducer} from './src/redux/reducer';
import CartIconTotal from './src/components/CartIconTotal';
import {storeData, getData, USER_PROFILE, FCM_TOKEN} from './src/containers/Settings/PersistUserData';
import ShareButton from './src/components/ShareButton';
// screens
import LaunchScreen from './src/containers/LaunchScreen';
import ProductBrowserScreen from './src/containers/ProductBrowserScreen';
import CheckoutScreen from './src/containers/CheckoutScreen';
import QuotationSentScreen from './src/containers/QuotationSentScreen';
import StoresBrowserScreen from './src/containers/StoresBrowserScreen';
import SumbitCustomLinkScreen from './src/containers/SumbitCustomLinkScreen';
import ScanQRCodeScreen from './src/containers/ScanQRCodeScreen';
import PaymentScreen from './src/containers/PaymentScreen';
import ShoppingCartScreen from './src/containers/ShoppingCartScreen';
import ReviewCartScreen from './src/containers/ReviewCartScreen';
import OrdersScreen from './src/containers/OrdersScreen';
import AboutUsScreen from './src/containers/AboutUsScreen';
import ContactUsScreen from './src/containers/AboutUsScreen/ContactUsScreen';
import SettingsScreen from './src/containers/Settings';
import UserProfileSettings from './src/containers/Settings/UserProfileSettings';
import OrderStatus from './src/containers/OrdersScreen/orderStatus';
import ExistingUserLogin from './src/containers/Settings/ExistingUserLogin';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;
const isLargeScreen = width >= 768;

const store = createStore(ShoppinReducer);
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();
const Logo = require('./src/assets/logo.png');

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="BrowseStores"
      tabBarOptions={{
        activeTintColor: '#000',
        showLabel: false,
      }}
    >
      <Tab.Screen
        name="BrowseStores"
        component={StoresBrowserScreen}
        options={({navigation}) => ({
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" color={color} size={size} />
          ),
        })}
      />
      <Tab.Screen
        name="SumbitCustomLink"
        component={SumbitCustomLinkScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="search" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="ShoppingCart"
        component={ShoppingCartScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <View>
              <View style={{position:'absolute',top:-4,left:22,width:15,height:15,borderRadius:15/2,backgroundColor:color}}>
                <CartIconTotal />
              </View>
              <Icon name="shopping-cart" color={color} size={size} />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}


function AppStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
      name="Home" 
      component={MyTabs} 
      options={({navigation}) => ({
        headerBackTitleVisible:false,
        headerTitle: () => (
          <View style={styles.logoContainer}>
              <Image
              resizeMode="contain"
              style={styles.logo}
              source={Logo}
              />
          </View>
        ),
        headerTitleStyle: {
          textAlign: 'center',
          alignSelf:'center',
          alignContent:'center'
        },
        headerRight: () => (
          <TouchableOpacity onPress={() => navigation.navigate("ScanQRCode")}>
            <MaterialCommunityIcons name="qrcode-scan" size={22} color="#000" style={{paddingRight:15}}/>
          </TouchableOpacity>
        ),
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
            <Icon name="menu" size={22} color="#000" style={{paddingLeft:15}}/>
          </TouchableOpacity>
        ),
      })}
      />
      <Stack.Screen 
      name="ProductBrowser" 
      component={ProductBrowserScreen} 
      options={{
        headerBackTitleVisible:false,
        headerTitle: () => (
          <Text style={mainStyles.NavigationTitle}>Product Browser</Text>
        )
      }}
      />
      <Stack.Screen
      options={{
        headerBackTitleVisible:false,
        headerTitle: () => (
          <Text style={mainStyles.NavigationTitle}>Custom Store Link</Text>
        )
      }}
      name="SumbitCustomLink" component={SumbitCustomLinkScreen} 
      />
      <Stack.Screen
      options={{
        headerBackTitleVisible:false,
        headerTitle: () => (
          <Text style={mainStyles.NavigationTitle}>Scan Product QR Code</Text>
        )
      }}
      name="ScanQRCode" component={ScanQRCodeScreen} />
      <Stack.Screen
      options={{
        headerBackTitleVisible:false,
        headerTitle: () => (
        <Text style={mainStyles.NavigationTitle}>Request Quotation</Text>
        )
      }}
      name="Checkout" 
      component={CheckoutScreen} 
      />
      <Stack.Screen 
      options={{
        headerBackTitleVisible:false,
        headerTitle: () => (
        <Text style={mainStyles.NavigationTitle}>Order Received</Text>
        )
      }}
      name="QuotationSent" 
      component={QuotationSentScreen} 
      />
      <Stack.Screen 
      options={{
        headerBackTitleVisible:false,
        headerTitle: () => (
        <Text style={mainStyles.NavigationTitle}>Make Payment To Invoice</Text>
        )
      }}
      name="MakePayment" 
      component={PaymentScreen} 
      />
      <Stack.Screen 
      options={{
        headerBackTitleVisible:false,
        headerTitle: () => (
        <Text style={mainStyles.NavigationTitle}>save my profile</Text>
        )
      }}
      name="UserProfile" 
      component={UserProfileSettings} 
      />
      <Stack.Screen 
      options={{
        headerBackTitleVisible:false,
        headerTitle: () => (
        <Text style={mainStyles.NavigationTitle}>Review Cart</Text>
        )
      }}
      name="ReviewCart" 
      component={ReviewCartScreen} 
      />
      <Stack.Screen 
      options={{
        headerBackTitleVisible:false,
        headerTitle: () => (
        <Text style={mainStyles.NavigationTitle}>USER PROFILE {"&"} SHIPPING</Text>
        )
      }}
      name="SettingsStack" 
      component={SettingsStack} 
      />
    </Stack.Navigator>
  );
}

function SettingsStack(){
  return (
    <Stack.Navigator>
      <Stack.Screen 
      options={{
        headerBackTitleVisible:false,
        headerTitle: () => (
        <Text style={mainStyles.NavigationTitle}>USER PROFILE {"&"} SHIPPING</Text>
        )
      }}
      name="Settings" 
      component={SettingsScreen} 
      />
      <Stack.Screen 
      options={{
        headerBackTitleVisible:false,
        headerTitle: () => (
        <Text style={mainStyles.NavigationTitle}>save my profile</Text>
        )
      }}
      name="UserProfileSettings" 
      component={UserProfileSettings} 
      />
      <Stack.Screen 
      options={{
        headerBackTitleVisible:false,
        headerTitle: () => (
        <Text style={mainStyles.NavigationTitle}>Existing Profile</Text>
        )
      }}
      name="ExistingProfile" 
      component={ExistingUserLogin} 
      />
    </Stack.Navigator>
  );
}

function OrdersStack(){
  return (
    <Stack.Navigator>
      <Stack.Screen
      name="Orders"
      component={OrdersScreen}
      options={({navigation}) => ({
        headerTitle: () => (
          <Text style={mainStyles.NavigationTitle}>orders</Text>
        ),
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
            <Icon name="menu" size={25} color="#000" style={{paddingLeft:15}}/>
          </TouchableOpacity>
        ),
      })}
      />
      <Stack.Screen 
      options={{
        headerBackTitleVisible:false,
        headerTitle: () => (
        <Text style={mainStyles.NavigationTitle}>Order Status</Text>
        )
      }}
      name="OrderStatus" 
      component={OrderStatus} 
      />
    </Stack.Navigator>
  );
}

function AboutUsStack(){
  return (
    <Stack.Navigator>
      <Stack.Screen
      name="About"
      component={AboutUsScreen}
      options={({navigation}) => ({
        headerTitle: () => (
          <Text style={mainStyles.NavigationTitle}>About SHOP TOP STORES</Text>
        ),
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
            <Icon name="menu" size={25} color="#000" style={{paddingLeft:15}}/>
          </TouchableOpacity>
        ),
      })}
      />
    </Stack.Navigator>
  );
}

function ContactUsStack(){
  return (
    <Stack.Navigator>
      <Stack.Screen
      name="Contact"
      component={ContactUsScreen}
      options={({navigation}) => ({
        headerTitle: () => (
          <Text style={mainStyles.NavigationTitle}>contact us</Text>
        ),
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
            <Icon name="menu" size={25} color="#000" style={{paddingLeft:15}}/>
          </TouchableOpacity>
        ),
      })}
      />
    </Stack.Navigator>
  );
}

function CustomDrawerContent(props) {
  return (
    <View style={{flex:1}} {...props}>
      <View style={{flex:0.98}}>
        <View style={{borderBottomColor:"#ccc",borderBottomWidth:1,marginTop:height*0.1}}>
        <DrawerItemList
        labelStyle={[mainStyles.ButtonTitle]}
        {...props} 
        />
        </View>
        <TouchableOpacity 
        onPress={() => props.navigation.navigate("SettingsStack")}
        style={{marginLeft:10, marginTop:30, marginBottom:30}}>
            <Text>
            <Text style={[mainStyles.ButtonTitle,{marginRight:10}]}>{"  "}USER PROFILE {"&"} SHIPPING</Text>
            </Text>
        </TouchableOpacity>
        <ShareButton />
      </View>
      <View style={{paddingLeft:20}}>
        <Text style={[mainStyles.TextRegular]}>V 1.3.5</Text>
      </View>
    </View>
  );
}

const DrawerNavigator = () => (
  <Drawer.Navigator
  drawerType="back"
  drawerContentOptions={{
    activeTintColor: '#e91e63',
    itemStyle: { marginVertical: 8 },
  }}
  drawerContent={(props) => <CustomDrawerContent {...props} />}
  >
    <Drawer.Screen
      name="App"
      component={AppStack}
      options={{ 
        drawerLabel: 'Home',
        drawerIcon: ({ tintColor }) => (
          <Icon name="home" size={20} color={tintColor}/>
        ),
      }}
    />
    <Drawer.Screen
      name="Orders"
      component={OrdersStack}
      options={{ 
        drawerLabel: 'Orders',
        drawerIcon: ({ tintColor }) => (
          <Icon name="file-text" size={20} color={tintColor}/>
        ),
      }}
    />
    <Drawer.Screen
      name="AboutUs"
      component={AboutUsStack}
      options={{ 
        drawerLabel: 'About & How to',
        drawerIcon: ({ tintColor }) => (
          <Icon name="info" size={20} color={tintColor}/>
        ),
      }}
    />
    <Drawer.Screen
      name="ContactUs"
      component={ContactUsStack}
      options={{ 
        drawerLabel: 'Contact',
        drawerIcon: ({ tintColor }) => (
          <Icon name="message-square" size={20} color={tintColor}/>
        ),
      }}
    />
  </Drawer.Navigator>
);

function LaunchStack(){
  return (
    <Stack.Navigator>
      <Stack.Screen 
      name="Launcher" 
      component={LaunchScreen} 
      options={{
        headerBackTitleVisible:false,
        headerShown:false
      }}
      />
      <Stack.Screen
        name="Drawer"
        component={DrawerNavigator}
        options={{
          headerBackTitleVisible:false,
          headerShown:false
        }}
      />
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    height:22
  },
});


const requestUserPermission = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    getFcmToken() //<---- Add this
    console.log('Authorization status:', authStatus);
  }
}

const getFcmToken = async () => {
  const fcmToken = await messaging().getToken();
  if (fcmToken) {
    await storeData(FCM_TOKEN, fcmToken);
    console.log("Your Firebase Token is:", fcmToken);
  } else {
   console.log("Failed", "No token received");
  }
}

export default function App() {
  useEffect(() => {
    SplashScreen.hide();
    requestUserPermission();
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert(remoteMessage.notification.title, remoteMessage.notification.body);
    });

    return unsubscribe;
  }, [])
  return (
    <Provider store={store}>
      <StatusBar hidden={false} barStyle="light-content" backgroundColor="#050505" />
      <NavigationContainer>
        <LaunchStack />
      </NavigationContainer>
    </Provider>
  );
}