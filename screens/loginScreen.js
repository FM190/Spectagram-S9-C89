import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import * as Google from 'expo-google-app-auth';
import { RFValue } from 'react-native-responsive-fontsize';
import firebase from 'firebase';

export default class LoginScreen extends React.Component {
  onSignIn = (googleUser) => {
    console.log('Google Auth Response', googleUser);
    const unsubscribe = firebase.auth().onAuthStateChanged((firebaseUser) => {
      unsubscribe();
      if (!this.isUserEqual(googleUser, firebaseUser)) {
        const credential = firebase.auth.GoogleAuthProvider.credential(
          googleUser.idToken,
          googleUser.accessToken
        );

        firebase
          .auth()
          .signInWithCredential(credential)
          .then((result) => {
            console.log('firebase');
            if (result.additionalUserInfo.isNewUser) {
              firebase
                .database()
                .ref('users/' + result.user.uid)
                .set({
                  gmail: result.user.email,
                  profile_picture: result.additionalUserInfo.profile.picture,
                  locale: result.additionalUserInfo.profile.locale,
                  first_name: result.additionalUserInfo.profile.given_name,
                  last_name: result.additionalUserInfo.profile.family_name,
                  current_theme: 'dark',
                });
            }
          })
          .catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.email;
            // The credential that was used.
            const credential =
              firebase.auth.GoogleAuthProvider.credentialFromError(error);
          });
      } else {
        console.log('User already signed-in Firebase.');
      }
    });
  };

  isUserEqual = (googleUser, firebaseUser) => {
    if (firebaseUser) {
      const providerData = firebaseUser.providerData;
      for (let i = 0; i < providerData.length; i++) {
        if (
          providerData[i].providerId ==
            firebase.auth.GoogleAuthProvider.PROVIDER_ID &&
          providerData[i].uid == googleUser.getBasicProfile().getId()
        ) {
          // We don't need to reauth the Firebase connection.
          return true;
        }
      }
    }
    return false;
  };

  signInWithGoogleAsync = async () => {
    try {
      const result = await Google.logInAsync({
        androidClientId:
          '209953266072-52tu6b8oe6b5hnvhnoh86pq8eac5srv5.apps.googleusercontent.com',
        iosClientId:
          '209953266072-h7iaebos0aii6van532c0em7oq1e36n6.apps.googleusercontent.com',
        scopes: ['profile', 'email'],
      });

      if (result.type === 'success') {
        this.onSignIn(result);
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Image source={require('../assets/logo.png')} style={styles.image} />
        <Text style={styles.text}>Spectragram</Text>

        <TouchableOpacity
          style={styles.loginbutton}
          onPress={() => {
            this.signInWithGoogleAsync();
          }}>
          <Image
            source={require('../assets/google.png')}
            style={styles.googleimage}
          />
          <Text style={styles.googleText}>Sign in with Google</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  loginbutton: {
    width: RFValue(250),
    height: RFValue(50),
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderRadius: RFValue(30),
    backgroundColor: 'white',
  },
  image: {
    width: 170,
    height: 170,
    borderRadius: 10,
    margin: 10,
  },
  text: {
    color: 'white',
    alignSelf: 'center',
    fontSize: RFValue(40),
    marginBottom: RFValue(100),
    margin: RFValue(5),
  },
  googleimage: {
    width: RFValue(30),
    height: RFValue(30),
    resizeMode: 'contain',
  },
  googleText: {
    color: 'black',
    fontSize: RFValue(20),
  },
});
