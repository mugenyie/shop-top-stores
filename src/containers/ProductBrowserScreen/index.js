import React, { Component } from 'react';
import {connect} from 'react-redux';
import {addToCart} from '../../redux/actions';
import { View, StyleSheet, Text, ActivityIndicator, Dimensions, TouchableOpacity, Platform } from 'react-native';
import { WebView } from 'react-native-webview';
import {captureScreen} from 'react-native-view-shot';
import ImgToBase64 from 'react-native-image-base64';
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
      screenShotUrl: "",
      screenShotBase64: "",
      currentBrowserHtmlSource: "",
      storeUrl: isValidURL(props.route.params.storeUrl) ? withHttps(props.route.params.storeUrl) : `https://www.google.com/search?q=${props.route.params.storeUrl}`
    };
  }

  saveState = (value) => {
    this.setState({screenShotBase64:value});
  }

  processCart = () => {
    this.setState({ visible: true });
    captureScreen({
      format: 'jpg',
      quality: 0.9, 
    })
    .then(uri => {
      ImgToBase64.getBase64String(uri)
      .then(base64Data => {
        return this.props.addItemToCart({
          id: this.state.currentUrl,
          name: this.state.currentBrowserHtmlSource,
          screenShotUrl: uri,
          screenShotBase64: base64Data
        })
      })
    })
    .then(() => this.props.navigation.navigate("ShoppingCart"))
    .catch(err => alert(err))
  }

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
    const { currentUrl, storeUrl } = this.state;
    const jsCode = "window.ReactNativeWebView.postMessage(document.getElementsByTagName('title')[0].innerHTML)";
    return (
      <View style={styles.webContainer}>
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
        <Button
          style={styles.buttoAddToCart}
          onPress={() => this.processCart()}
          block
          >
            <Text style={[mainStyles.ButtonTitle,{color:'#fff'}]}>
              add to cart
            </Text>
            <Icon style={{paddingLeft:10}} color={"#fff"} name="shopping-cart" size={20}/>
            <View style={{width:14,height:14,borderRadius:7,backgroundColor:'#000',top:-10,right:1}}><CartIconTotal style={{fontSize:10}} /></View>
          </Button>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  buttoAddToCart : {
    position:'absolute',
    zIndex:10,
    bottom:Platform.OS == "android"? 4 : 25,
    alignSelf:'center',
    alignContent:'center',
    alignItems:'center',
    backgroundColor: 'transparent',
    backgroundColor:'#D2232A',
    borderRadius:10, 
    width:width*0.8, 
    marginBottom:10, 
    alignSelf: 'center',
  },
  buttonAddToCart: {
    
  },
  webContainer:{
    flex:1,
    flexDirection:'column'
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
    backgroundColor: '#000',
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