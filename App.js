import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from './screens/SplashScreen';
import AuthScreen from './screens/AuthScreen';
import TabNavigator from './navigator/TabNavigator';
import HistoryRecipeStack from './navigator/HistoryStack';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Splash" component={SplashScreen} />
    <Stack.Screen name="Auth" component={AuthScreen} />
    <Stack.Screen name="Main" component={TabNavigator} />
    <Stack.Screen name="HistoryStack" component={HistoryRecipeStack} />
  </Stack.Navigator>
</NavigationContainer>
  );
}
