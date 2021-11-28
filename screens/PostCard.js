import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { RFValue } from 'react-native-responsive-fontsize';
import firebase from 'firebase';

export default class PostCard extends Component {
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
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() =>
          this.props.navigation.navigate('PostScreen', (post = this.props.post))
        }>
        <View
          style={
            this.state.lighttheme
              ? styles.lightcardContainer
              : styles.darkcardContainer
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
                {this.props.post.author}
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
              {this.props.post.caption}
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
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  darkcardContainer: {
    margin: RFValue(13),
    borderWidth: 1,
    borderColor: 'white',
    backgroundColor: '#2a2a2a',
    borderRadius: RFValue(20),
    padding: RFValue(20),
  },
  lightcardContainer: {
    margin: RFValue(13),
    borderWidth: 1,
    borderColor: 'black',
    backgroundColor: 'white',
    borderRadius: RFValue(20),
    padding: RFValue(20),
  },
  authorContainer: {
    flex: 0.1,
    flexDirection: 'row',
  },
  authorImageContainer: {
    flex: 0.15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: RFValue(40),
    height: RFValue(40),
    resizeMode: 'contain',
    borderRadius: RFValue(100),
    marginTop: 10,
    marginRight: 10,
    marginBottom: 1,
  },
  authorNameContainer: {
    flex: 0.85,
    justifyContent: 'center',
  },
  darkauthorNameText: {
    color: 'white',
    fontSize: RFValue(20),
  },
  lightauthorNameText: {
    color: 'black',
    fontSize: RFValue(20),
  },
  postImage: {
    marginTop: RFValue(20),
    resizeMode: 'contain',
    width: RFValue(300),
    alignSelf: 'center',
    height: RFValue(275),
  },
  captionContainer: {},
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
  actionContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: RFValue(10),
  },
  lightlikeButton: {
    width: RFValue(160),
    height: RFValue(40),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#eb3948',
    borderRadius: RFValue(30),
  },
  darklikeButton: {
    width: RFValue(160),
    height: RFValue(40),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#eb3948',
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
});
