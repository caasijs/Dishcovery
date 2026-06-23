import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, Alert,} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';

//yung colors
const COLORS = {
  orange: '#cb7830',
  lightestGreen: '#dfebbe',
  darkestGreen: '#342d1c',
  lighterGreen: '#536632',
  lightGreen: '#82a749',
  white: '#fff',
};

//navigate the recipes from SuggestedRecipeDetailScreen
const HistoryScreen = ({ navigation }) => {
  const [ratedRecipes, setRatedRecipes] = useState([]);

  useEffect(() => {
    const loadRatedRecipes = async () => {
      try {
        const savedRecipes = await AsyncStorage.getItem('recipeHistory');
        if (savedRecipes) {
          setRatedRecipes(JSON.parse(savedRecipes));
        }
      } catch (error) {
        console.error('Error loading rated recipes:', error);
      }
    };

    const unsubscribe = navigation.addListener('focus', loadRatedRecipes);
    return unsubscribe;
  }, [navigation]);

  const navigateToRecipeDetail = (recipe) => {
    navigation.navigate('SuggestedRecipeDetail', {
      recipe,
      fromHistory: true,
    });
  };

  //to clear all of the recipes
  const clearHistory = () => {
    Alert.alert(
      'Clear History',
      'Are you sure you want to clear all rated recipes?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Clear', style: 'destructive', onPress: async () => {
            try { await AsyncStorage.removeItem('recipeHistory');
              setRatedRecipes([]);
            } catch (error) {
              console.error('Error clearing history:', error);
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Recipe History</Text>

        {ratedRecipes.length > 0 && (
          <TouchableOpacity
            onPress={clearHistory}
            style={styles.iconButton}
            accessibilityLabel="Clear history"
          >
            <Ionicons name="trash-outline" size={28} color={COLORS.orange} />
          </TouchableOpacity>
        )}
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {ratedRecipes.length > 0 ? (
          ratedRecipes.map((recipe, index) => (
            <TouchableOpacity
              key={recipe.id ? recipe.id.toString() : `${recipe.title}-${index}`}
              style={styles.recipeCard}
              onPress={() => navigateToRecipeDetail(recipe)}
            >
              <Image source={{ uri: recipe.image }} style={styles.recipeImage} />
              <Text style={styles.recipeTitle}>{recipe.title}</Text>
              <Text style={styles.recipeRating}>Rating: {recipe.rating} ★</Text>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.noRecipesText}>No rated recipes found.</Text>
        )}
      </ScrollView>
    </View>
  );
};

//design
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightestGreen,
    paddingHorizontal: 20,
    paddingVertical: 40,
    paddingTop: 60,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    position: 'relative',
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.darkestGreen,
    textAlign: 'center',
    flex: 1,
  },
  iconButton: {
    position: 'absolute',
    right: 0,
    padding: 8,
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  recipeCard: {
    backgroundColor: COLORS.white,
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    elevation: 3,
    shadowColor: COLORS.darkestGreen,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  recipeImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 10,
  },
  recipeTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.darkestGreen,
    marginBottom: 4,
  },
  recipeRating: {
    fontSize: 16,
    color: COLORS.orange,
  },
  noRecipesText: {
    textAlign: 'center',
    fontSize: 18,
    color: COLORS.lighterGreen,
    marginTop: 50,
  },
});

export default HistoryScreen;
