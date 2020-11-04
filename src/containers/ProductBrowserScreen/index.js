import React, { Component } from 'react';
import {connect} from 'react-redux';
import {addToCart} from '../../redux/actions';
import { View, StyleSheet, Text, ActivityIndicator, Dimensions, TouchableOpacity, Platform } from 'react-native';
import { WebView } from 'react-native-webview';
import {captureScreen} from 'react-native-view-shot';
import Icon from 'react-native-vector-icons/Feather';
import {Button} from 'native-base';
import CartIconTotal from '../../components/CartIconTotal';
import mainStyles from '../../shared/mainStyles';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const isValidURL = str => {
  var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  return !!pattern.test(str);
}

const withHttps = url => !/^https?:\/\//i.test(url) ? `https://${url}` : url;

const AppButton = ({ onPress, title }) => (
  <TouchableOpacity onPress={onPress} style={styles.appButtonContainer}>
    <Text style={styles.appButtonText}>{title}</Text>
  </TouchableOpacity>
);

class ProductBrowserScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUrl: "",
      visible: true,
      screenShot: "#",
      currentBrowserHtmlSource: "",
      storeUrl: isValidURL(props.route.params.storeUrl) ? withHttps(props.route.params.storeUrl) : `https://www.google.com/search?q=${props.route.params.storeUrl}`
    };
  }

  takeScreenShot() {
    captureScreen({
      format: 'jpg',
      quality: 0.9, 
    }).then(
      (uri) => {
        this.setState({screenShot:uri})
        console.log(`Image url: ${uri}`)
      },
      (error) => console.error('Oops, Something Went Wrong', error),
    );
  };

  hideSpinner() {
    this.setState({ visible: false });
  }  

  showSpinner() {
    this.setState({ visible: true });
    setTimeout(() => this.setState({ visible: false }), 3000);
  }

  _onNavigationStateChange(webViewState){
    this.setState({currentUrl:webViewState.url});
  }

  goBack = () => {
    this.webview.goBack();
  };

  goForward = () => {
    this.webview.goForward();
  };

  _onMessage = (event) => {
    this.setState({currentBrowserHtmlSource:event.nativeEvent.data})
  }

  render() {
    const { currentUrl, storeUrl, currentBrowserHtmlSource } = this.state;
    const jsCode = "window.ReactNativeWebView.postMessage(document.getElementsByTagName('title')[0].innerHTML)";
    return (
      <View style={styles.webContainer}>
        <View style={{ flex: 1 }}>
          <WebView
          ref={r => this.webview = r}
          onLoadStart={() => this.showSpinner()}
          onLoad={() => this.hideSpinner()}
          onNavigationStateChange={this._onNavigationStateChange.bind(this)}
          source={{ uri: storeUrl }}
          onMessage={this._onMessage}
          injectedJavaScript={jsCode}
          />
          {this.state.visible && (
            <ActivityIndicator
            style={styles.activityLoader}
            size={width*0.15} color="#212121" 
            />
          )}
        </View>
        <View style={styles.viewAddToCart}>
          <Text style={[mainStyles.TextRegular,{color:'#fff',textAlign:'center',paddingLeft:2,paddingRight:2}]}>
          <Text style={{fontWeight:"bold",textDecorationStyle:'solid',textDecorationLine:'underline',textTransform:'uppercase'}}>Instructions{"\n"}
          </Text> click <Text style={{fontWeight:"bold"}}>"ADD TO CART"</Text> below once you identify your desired item.
          {/* <Text>{"\n"}Do not accept/click "signup" or "download app" prompts while on this page.</Text> */}
          </Text>
          <View style={{flexDirection:'row',marginTop:height*0.015}}>
            <TouchableOpacity 
            onPress={() => this.goBack()}
            style={[styles.directionButton,{marginRight:width*0.35}]}>
              <Icon style={{paddingRight:4}} name="arrow-left" size={22} color="#fff"/>
            </TouchableOpacity>
            <Icon name="arrow-down" size={25} color="#fff"/>
            <TouchableOpacity 
            onPress={() => this.goForward()}
            style={[styles.directionButton,{marginLeft:width*0.35}]}>
              <Icon style={{paddingLeft:7}} name="arrow-right" size={22} color="#fff"/>
            </TouchableOpacity>
          </View>
          <Button
          style={[{backgroundColor:'#D2232A',marginTop:height*0.02,borderRadius:0}, Platform.OS == "ios" ? {height:height*0.08}:{}]}
          // onPress={() => {
          //   this.props.addItemToCart({
          //     id: currentUrl,
          //     name: currentBrowserHtmlSource
          //   });
          //   this.props.navigation.navigate("ShoppingCart");
          // }}
          onPress={this.takeScreenShot}
          block
          >
            <Text style={[mainStyles.ButtonTitle,{color:'#fff'}]}>
              add to cart
            </Text>
            <Icon style={{paddingLeft:10}} color={"#fff"} name="shopping-cart" size={20}/>
            <View style={{width:14,height:14,borderRadius:7,backgroundColor:'#000',top:-10,right:1}}><CartIconTotal style={{fontSize:10}} /></View>
          </Button>
        </View>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  viewAddToCart : {
    paddingTop:height*0.015,
    //flex:0.32,
    alignContent:'center',
    alignItems:'center',
    backgroundColor:'#202020'
  },
  buttonAddToCart: {
    
  },
  webContainer:{
    flex:1
  },
  textBold : {
    color:'#fff',
    textAlign:'center'
  },
  appButtonContainer: {
    elevation: 10,
    backgroundColor: "#D2232A",
    borderRadius: 4,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginTop:height*0.02,
    width:width*0.8,
    alignSelf:'center'
  },
  appButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  },
  directionButton:{
    backgroundColor: '#ffffff6e',
    justifyContent: 'center',
    alignContent: 'center',
    borderRadius: 15,
    width: 30,
    height: 30,
  },
  activityLoader:{
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 4
  }
});

const mapDispatchToProps = dispatch => {
  return {
    addItemToCart: item => dispatch(addToCart(item))
  }
}

export default connect(null, mapDispatchToProps)(ProductBrowserScreen);