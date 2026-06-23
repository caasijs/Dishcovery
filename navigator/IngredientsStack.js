//stack para sa IngredientsScreen, SuggestedRecipeScreen, and SuggestedRecipeDetailScreen
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import IngredientsScreen from '../screens/IngredientsScreen';
import SuggestedRecipeScreen from '../screens/SuggestedRecipeScreen';
import SuggestedRecipeDetailScreen from '../screens/SuggestedRecipeDetailScreen';

const Stack = createNativeStackNavigator();

function IngredientsStack() {
  return (
       <Stack.Navigator screenOptions={{ headerShown: false }}>
       <Stack.Screen name="Ingredients" component={IngredientsScreen} />
       <Stack.Screen name="SuggestedRecipe" component={SuggestedRecipeScreen} />
       <Stack.Screen name="SuggestedRecipeDetail" component={SuggestedRecipeDetailScreen} />
   </Stack.Navigator>
  );
}

export default IngredientsStack;
