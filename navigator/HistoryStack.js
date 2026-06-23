// stack para sa SuggestedRecipeDetailScreen and HistoryScreen
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HistoryScreen from '../screens/HistoryScreen';
import SuggestedRecipeDetailScreen from '../screens/SuggestedRecipeDetailScreen';

const Stack = createNativeStackNavigator();

export default function HistoryStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HistoryMain" component={HistoryScreen} />
      <Stack.Screen name="SuggestedRecipeDetail" component={SuggestedRecipeDetailScreen} />
    </Stack.Navigator>
  );
}
