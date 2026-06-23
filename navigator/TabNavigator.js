//mga tab
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Navigators
import IngredientsStack from '../navigator/IngredientsStack';
import HistoryStack from '../navigator/HistoryStack';
import HomeScreen from '../screens/HomeScreen';

//mga colors na gagamitin
const COLORS = {
  orange: '#cb7830',
  lightestGreen: '#dfebbe',
  darkestGreen: '#342d1c',
  lighterGreen: '#536632',
  lightGreen: '#82a749',
  white: 'FFFFFF',
};

const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'Home') iconName = 'home-outline';
          else if (route.name === 'Ingredient') iconName = 'restaurant-outline';
          else if (route.name === 'History') iconName = 'time-outline';

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        headerShown: false,
        tabBarStyle: {
          backgroundColor: COLORS.lightestGreen,
          borderTopColor: COLORS.lighterGreen,
        },
        tabBarActiveTintColor: COLORS.orange,
        tabBarInactiveTintColor: COLORS.lighterGreen,
        tabBarLabelStyle: {
          fontWeight: 'bold',
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Ingredient" component={IngredientsStack} />
      <Tab.Screen name="History" component={HistoryStack} />
    </Tab.Navigator>
  );
}

export default TabNavigator;