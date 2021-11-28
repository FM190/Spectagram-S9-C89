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
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { TouchableOpacity } from 'react-native-gesture-handler';
import firebase from 'firebase';

export default class PostScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lighttheme: false,
    };
  }

  componentDidMount() {
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
    if (!this.props.route.params) {
      this.props.navigation.navigate('Home');
    } else {
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
                Spectagram
              </Text>
            </View>
          </View>
          <View style={styles.postContainer}>
            <ScrollView
              style={
                this.state.lighttheme
                  ? styles.lightpostCard
                  : styles.darkpostCard
              }>
              <View style={styles.authorContainer}>
                <View style={styles.authorImageContainer}>
                  <Image
                    source={require('../assets/profile_img.png')}
                    style={styles.profileImage}></Image>
                </View>
                <View style={styles.authorNameContainer}>
                  <Text
                    style={
                      this.state.lighttheme
                        ? styles.lightauthorNameText
                        : styles.darkauthorNameText
                    }>
                    {this.props.route.params.author}
                  </Text>
                </View>
              </View>
              <Image
                source={require('../assets/study5.jpg')}
                style={styles.postImage}
              />
              <View style={styles.captionContainer}>
                <Text
                  style={
                    this.state.lighttheme
                      ? styles.lightcaptionText
                      : styles.darkcaptionText
                  }>
                  {this.props.route.params.caption}
                </Text>
              </View>
              <View style={styles.actionContainer}>
                <View
                  style={
                    this.state.lighttheme
                      ? styles.lightlikeButton
                      : styles.darklikeButton
                  }>
                  <Ionicons
                    name={'heart'}
                    size={RFValue(30)}
                    color={
                      this.state.lighttheme
                        ? styles.lightlikeText
                        : styles.darklikeText
                    }
                  />
                  <Text
                    style={
                      this.state.lighttheme
                        ? styles.lightlikeText
                        : styles.darklikeText
                    }>
                    12k
                  </Text>
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  darkcontainer: {
    flex: 1,
    backgroundColor: 'black',
  },
  lightcontainer: {
    flex: 1,
    backgroundColor: 'white',
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
  postContainer: {
    flex: 1,
  },
  lightpostCard: {
    margin: RFValue(20),
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: RFValue(20),
  },
  darkpostCard: {
    margin: RFValue(20),
    borderWidth: 1,
    borderColor: 'white',
    backgroundColor: '#002140',
    borderRadius: RFValue(20),
  },
  actionContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: RFValue(10),
  },
  lightlikeButton: {
    width: RFValue(160),
    height: RFValue(40),
    flexDirection: 'row',
    backgroundColor: '#eb3948',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: RFValue(30),
  },
  darklikeButton: {
    width: RFValue(160),
    height: RFValue(40),
    flexDirection: 'row',
    backgroundColor: '#eb3948',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: RFValue(30),
  },
  lightlikeText: {
    color: 'black',
    fontSize: RFValue(25),
    marginLeft: RFValue(5),
  },
  darklikeText: {
    color: 'white',
    fontSize: RFValue(25),
    marginLeft: RFValue(5),
  },
  authorContainer: {
    height: RFPercentage(10),
    padding: RFValue(10),
    flexDirection: 'row',
  },
  authorImageContainer: {
    flex: 0.15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    borderRadius: RFValue(100),
  },
  authorNameContainer: {
    flex: 0.85,
    padding: RFValue(10),
    justifyContent: 'center',
  },
  lightauthorNameText: {
    color: 'black',
    fontSize: RFValue(20),
  },
  darkauthorNameText: {
    color: 'white',
    fontSize: RFValue(20),
  },
  postImage: {
    width: '100%',
    alignSelf: 'center',
    height: RFValue(200),
    borderTopLeftRadius: RFValue(20),
    borderTopRightRadius: RFValue(20),
    resizeMode: 'contain',
  },
  captionContainer: {
    padding: RFValue(10),
  },
  lightcaptionText: {
    fontSize: 13,
    color: 'black',
    paddingTop: RFValue(10),
  },
  darkcaptionText: {
    fontSize: 13,
    color: 'white',
    paddingTop: RFValue(10),
  },
});
