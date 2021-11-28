import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from './screens/loginScreen';
import LoadingScreen from './screens/loadingScreen';
import DashBoardScreen from './screens/dashBoardScreen';
import StackNavigator from "./navigation/StackNavigator";
import { createStackNavigator } from "@react-navigation/stack";
import { firebaseConfig } from "./Config";
import firebase from "firebase"; 

if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig);
}else{
  firebase.app();
}

var Stack = createStackNavigator(); 

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Loading" component={LoadingScreen}/>
        <Stack.Screen name="Login" component={LoginScreen}/>
        <Stack.Screen name="Dashboard" component={DashBoardScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}