import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, Platform, SafeAreaView, StatusBar, TouchableOpacity, ScrollView, Modal, Dimensions, } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeRecipeDetailScreen from '../screens/HomeRecipeDetailScreen';
import SettingsDetailScreen from '../screens/SettingsDetailScreen';

const Stack = createNativeStackNavigator();

//basis para design
const COLORS = {
  orange: '#cb7830',
  lightestGreen: '#dfebbe',
  darkestGreen: '#342d1c',
  lighterGreen: '#536632',
  lightGreen: '#82a749',
  white: '#FFFFFF',
};

const screenWidth = Dimensions.get('window').width;

//array of recipes
const recipes = [
  { id: 1, name: 'NutriBap: The Wellness Bowl', image: require('../assets/popularRecipe1.png') },
  { id: 2, name: 'HearthyZest Salad', image: require('../assets/popularRecipe2.png') },
  { id: 3, name: 'Green Pho Revival', image: require('../assets/popularRecipe3.png') },
  { id: 4, name: 'Chickenova Biryani', image: require('../assets/popularRecipe4.png') },
  { id: 5, name: 'Ecobite Burger', image: require('../assets/popularRecipe5.png') },
];

const HomeScreenMain = ({ navigation }) => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [notificationsVisible, setNotificationsVisible] = useState(true);

  //for modal notification
  const notifications = [
    {
      id: 1,
      type: 'reminder',
      title: '🗓️ Weekly Reminder',
      message: 'Plan your meals ahead to avoid unnecessary food waste!',
    },
    {
      id: 2,
      type: 'tip',
      title: '🌿 Sustainability Tip',
      message: 'Buy loose produce instead of plastic-wrapped items.',
    },
    {
      id: 3,
      type: 'tip',
      title: '🍽️ Leftover Hack',
      message: 'Transform last night’s veggies into a hearty soup!',
    },
    {
      id: 4,
      type: 'tip',
      title: '🔌 Energy Saver',
      message: 'Use lids while cooking to reduce energy use by up to 66%.',
    },
    {
      id: 5,
      type: 'reminder',
      title: '🗓️ Weekly Reminder',
      message: 'Check your fridge and pantry before shopping!',
    },
  ];

  return (
    <SafeAreaView style={styles.safeContainer}>
      <ScrollView contentContainerStyle={styles.container}>
     
        <TouchableOpacity style={styles.header} onPress={() => setDrawerVisible(true)}>
          <Ionicons name="person-circle-outline" size={80} color={COLORS.darkestGreen} />
          <View style={styles.headerText}>
            <Text style={styles.greeting}>Hello!</Text>
            <Text style={styles.subText}>Ready to discover a new dish?</Text>
          </View>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>🍽️ Today's Special</Text>
        <View style={styles.specialContainer}>
          <View style={styles.specialText}>
            <Text style={styles.dishName}>Garden Salad</Text>
            <Text style={styles.description}>A crisp, fresh mix of greens and tangy dressing.</Text>
          </View>
          <Image source={require('../assets/todaysSpecial.png')} style={styles.specialImage} />
        </View>

        <Text style={styles.sectionTitleGreen}>🔥 Top Featured Recipes</Text>
        <View style={styles.featuredBackground}>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={recipes}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => navigation.navigate('RecipeDetail', { recipe: item })}
                style={styles.recipeCard}
              >
                <Image source={item.image} style={styles.recipeImage} />
              </TouchableOpacity>
            )}
            contentContainerStyle={{ paddingVertical: 10, paddingHorizontal: 10 }}
          />
        </View>
      </ScrollView>

      <Modal visible={notificationsVisible} transparent animationType="fade">
        <View style={styles.notificationOverlay}>
          <View style={styles.notificationContainer}>
            <ScrollView>
              {notifications.map((note) => (
                <View
                  key={note.id}
                  style={[
                    styles.notificationCard,
                    {
                      backgroundColor:
                        note.type === 'reminder' ? COLORS.orange : COLORS.lightGreen,
                    },
                  ]}
                >
                  <Text style={styles.notificationTitle}>{note.title}</Text>
                  <Text style={styles.notificationText}>{note.message}</Text>
                </View>
              ))}
            </ScrollView>
            <TouchableOpacity
              onPress={() => setNotificationsVisible(false)}
              style={styles.dismissButton}
            >
              <Text style={styles.dismissText}>Got it!</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal visible={drawerVisible} animationType="slide" transparent={true}>
        <View style={styles.drawerOverlay}>
          <View style={styles.drawer}>
            <View style={styles.drawerContent}>
              <ScrollView>
                <Text style={styles.drawerTitle}>Settings</Text>
                <Text style={styles.drawerSectionTitle}>Account</Text>

                <TouchableOpacity onPress={() => {
                  setDrawerVisible(false);
                  navigation.navigate('SettingsDetail', { title: 'Profile' });
                }}>
                  <Text style={styles.settingItem}>Profile</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {
                  setDrawerVisible(false);
                  navigation.navigate('SettingsDetail', { title: 'Change Password' });
                }}>
                  <Text style={styles.settingItem}>Change Password</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {
                  setDrawerVisible(false);
                  navigation.navigate('SettingsDetail', { title: 'About Us' });
                }}>
                  <Text style={styles.settingItem}>About Us</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {
                  setDrawerVisible(false);
                  navigation.navigate('SettingsDetail', { title: 'Logout' });
                }}>
                  <Text style={styles.settingItem}>Logout</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setDrawerVisible(false)} style={styles.closeDrawerButton}>
                  <Text style={styles.closeDrawerText}>Close</Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

//navigator
const HomeScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeScreenMain" component={HomeScreenMain} options={{ headerShown: false }} />
      <Stack.Screen name="RecipeDetail" component={HomeRecipeDetailScreen} options={{ headerShown: false }} />
      <Stack.Screen name="SettingsDetail" component={SettingsDetailScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

//design
const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: COLORS.lightestGreen,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 20,
  },
  headerText: {
    marginLeft: 20,
  },
  greeting: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.darkestGreen,
    marginBottom: 6,
  },
  subText: {
    fontSize: 20,
    color: 'gray',
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.orange,
    marginVertical: 20,
    letterSpacing: 0.5,
  },
  sectionTitleGreen: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.darkestGreen,
    marginVertical: 10,
    letterSpacing: 0.5,
  },
  specialContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.lighterGreen,
    borderRadius: 25,
    overflow: 'hidden',
    alignItems: 'center',
    marginBottom: 30,
    elevation: 4,
    padding: 5,
  },
  specialText: {
    flex: 1,
    padding: 20,
  },
  dishName: {
    fontWeight: 'bold',
    fontSize: 24,
    color: 'white',
    marginBottom: 8,
  },
  description: {
    fontSize: 18,
    color: 'white',
  },
  specialImage: {
    width: 160,
    height: 160,
    borderRadius: 80,
    marginRight: 10,
    borderWidth: 3,
    borderColor: COLORS.orange,
  },
  featuredBackground: {
    backgroundColor: COLORS.orange,
    borderRadius: 25,
    paddingVertical: 10,
    marginBottom: 30,
    elevation: 4,
  },
  recipeCard: {
    alignItems: 'center',
    marginRight: 15,
    width: 250,
  },
  recipeImage: {
    width: 250,
    height: 250,
    borderRadius: 20,
    marginBottom: 8,
    borderWidth: 2,
    borderColor: '#fff',
  },
  drawerOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    flexDirection: 'row',
  },
  drawer: {
    backgroundColor: COLORS.white,
    width: screenWidth * 0.8,
    height: '100%',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    justifyContent: 'space-between',
  },
  drawerContent: {
    flex: 1,
  },
  drawerTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: COLORS.orange,
    marginBottom: 20,
  },
  drawerSectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.darkestGreen,
    borderBottomWidth: 2,
    borderBottomColor: COLORS.lighterGreen,
    marginBottom: 10,
    marginTop: 20,
  },
  settingItem: {
    fontSize: 16,
    color: COLORS.darkestGreen,
    marginBottom: 8,
  },
  closeDrawerButton: {
    backgroundColor: COLORS.orange,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 20,
    marginTop: 15,
    alignItems: 'center',
  },
  closeDrawerText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  notificationOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  notificationContainer: {
    width: '100%',
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 20,
    maxHeight: '80%',
  },
  notificationCard: {
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
  },
  notificationTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: 6,
  },
  notificationText: {
    fontSize: 16,
    color: COLORS.white,
  },
  dismissButton: {
    backgroundColor: COLORS.lighterGreen,
    padding: 12,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  dismissText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
