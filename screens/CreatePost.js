import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  ScrollView,
  TextInput,
} from 'react-native';
import * as Font from 'expo-font';
import firebase from 'firebase';
import { RFValue } from 'react-native-responsive-fontsize';
import DropDownPicker from 'react-native-dropdown-picker';

let stories = require('./temp_posts.json');
let customFonts = {
  BubblegumSans: require('../assets/fonts/BubblegumSans-Regular.ttf'),
};

export default class CreatePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontloaded: false,
      previewImage: 'image_1',
      dropdownHeight: 40,
      lighttheme: false,
    };
  }

  async loadFontAsync() {
    await Font.loadAsync(customFonts);
    this.setState({
      fontloaded: true,
    });
  }

  componentDidMount() {
    this.loadFontAsync();
    var theme;
    firebase
      .database()
      .ref('users/' + firebase.auth().currentUser.uid)
      .on('value', (data) => {
        theme = data.val().current_theme;
        this.setState({
          lighttheme: theme === 'light' ? true : false,
        });
      });
  }

  render() {
    let preview_images = {
      image_1: require('../assets/image_1.jpg'),
      image_2: require('../assets/image_2.jpg'),
      image_3: require('../assets/image_3.jpg'),
      image_4: require('../assets/image_4.jpg'),
      image_5: require('../assets/image_5.jpg'),
      image_6: require('../assets/image_6.jpg'),
      image_7: require('../assets/image_7.jpg'),
    };
    return (
      <View
        style={
          this.state.lighttheme ? styles.lightcontainer : styles.darkcontainer
        }>
        <SafeAreaView style={styles.droidSafeArea} />
        <View style={styles.appTitle}>
          <View style={styles.appIcon}>
            <Image
              source={require('../assets/logo.png')}
              style={styles.iconImage}></Image>
          </View>
          <View style={styles.appTitleTextContainer}>
            <Text
              style={
                this.state.lighttheme
                  ? styles.lightappTitleText
                  : styles.darkappTitleText
              }>
              New Post
            </Text>
          </View>
        </View>
        <View style={styles.fieldsContainer}>
          <ScrollView>
            <Image
              source={preview_images[this.state.previewImage]}
              style={styles.previewImage}></Image>
            <View style={{ height: RFValue(this.state.dropdownHeight) }}>
              <DropDownPicker
                items={[
                  { label: 'Image 1', value: 'image_1' },
                  { label: 'Image 2', value: 'image_2' },
                  { label: 'Image 3', value: 'image_3' },
                  { label: 'Image 4', value: 'image_4' },
                  { label: 'Image 5', value: 'image_5' },
                  { label: 'Image 6', value: 'image_6' },
                  { label: 'Image 7', value: 'image_7' },
                ]}
                defaultValue={this.state.previewImage}
                containerStyle={{
                  height: 40,
                  borderRadius: 20,
                  marginBottom: 10,
                }}
                onOpen={() => {
                  this.setState({ dropdownHeight: 170 });
                }}
                onClose={() => {
                  this.setState({ dropdownHeight: 40 });
                }}
                style={
                  this.state.lighttheme
                    ? styles.lightinputstyle
                    : styles.darkinputstyle
                }
                itemStyle={
                  ([
                    this.state.lighttheme
                      ? styles.lightinputstyle
                      : styles.darkinputstyle,
                  ],
                  {
                    justifyContent: 'flex-start',
                  })
                }
                dropDownStyle={
                  this.state.lighttheme
                    ? styles.lightinputstyle
                    : styles.darkinputstyle
                }
                labelStyle={
                  this.state.lighttheme
                    ? styles.lightinputstyle
                    : styles.darkinputstyle
                }
                arrowStyle={
                  ([
                    this.state.lighttheme
                      ? styles.lightinputstyle
                      : styles.darkinputstyle,
                  ],
                  { color: 'red' })
                }
                onChangeItem={(item) =>
                  this.setState({
                    previewImage: item.value,
                  })
                }
              />
            </View>

            <TextInput
              style={
                this.state.lighttheme
                  ? styles.lightinputfont
                  : styles.darkinputfont
              }
              onChangeText={(caption) => this.setState({ caption })}
              placeholder={' Caption'}
              placeholderTextColor="red"
            />
          </ScrollView>
        </View>
        <View style={{ flex: 0.08 }} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  lightcontainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  darkcontainer: {
    flex: 1,
    backgroundColor: 'black',
  },
  droidSafeArea: {
    marginTop:
      Platform.OS === 'android' ? StatusBar.currentHeight : RFValue(35),
  },
  appTitle: {
    flex: 0.07,
    flexDirection: 'row',
  },
  appIcon: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  appTitleTextContainer: {
    flex: 0.7,
    justifyContent: 'center',
  },
  darkappTitleText: {
    color: 'white',
    fontSize: RFValue(28),
  },
  lightappTitleText: {
    color: 'black',
    fontSize: RFValue(28),
  },
  fieldsContainer: {
    flex: 0.85,
  },
  previewImage: {
    width: '93%',
    height: RFValue(250),
    alignSelf: 'center',
    borderRadius: RFValue(10),
    marginVertical: RFValue(10),
    resizeMode: 'contain',
  },
  lightinputfont: {
    backgroundColor: 'white',
    color: 'black',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 20,
    padding: 5,
  },
  darkinputfont: {
    backgroundColor: 'black',
    color: 'white',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 20,
    padding: 5,
  },
  darkinputstyle: {
    backgroundColor: 'black',
    color: 'white',
  },
  lightinputstyle: {
    backgroundColor: 'white',
    color: 'black',
  },
});
