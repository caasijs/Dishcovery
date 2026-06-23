import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, ActivityIndicator, } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

//basis ng colors ng app
const COLORS = {
  orange: '#cb7830',
  lightestGreen: '#dfebbe',
  darkestGreen: '#342d1c',
  lighterGreen: '#536632',
  lightGreen: '#82a749',
  white: '#fff',
};

//navigate
const SuggestedRecipeScreen = ({ navigation, route }) => {
  const { ingredients, filters } = route.params;
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const tabBarHeight = useBottomTabBarHeight();

  useEffect(() => {
    navigation.setOptions({
      title: 'Suggested Recipes',
      headerStyle: {
        backgroundColor: COLORS.lightestGreen,
      },
      headerTintColor: COLORS.darkestGreen,
      headerTitleStyle: {
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
      },
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: 10 }}>
          <Ionicons name="arrow-back" size={24} color={COLORS.darkestGreen} />
        </TouchableOpacity>
      ),
    });

    const fetchRecipes = async () => {
      try {
        const apiKey = '44e34caf9b3a49189c642fab17928d66';

        const dietParam = filters.diet.length > 0 ? filters.diet.join(',') : undefined;
        const intolerancesParam = filters.intolerances.length > 0 ? filters.intolerances.join(',') : undefined;
        const cuisineParam = filters.cuisine.length > 0 ? filters.cuisine.join(',') : undefined;
        const typeParam = filters.type.length > 0 ? filters.type.join(',') : undefined;

        const response = await axios.get(
          'https://api.spoonacular.com/recipes/complexSearch',
          {
            params: {
              apiKey,
              includeIngredients: ingredients,
              diet: dietParam,
              intolerances: intolerancesParam,
              cuisine: cuisineParam,
              type: typeParam,
              number: 10,
              addRecipeInformation: true,
            },
          }
        );

        setRecipes(response.data.results);
      } catch (err) {
        console.error('Error fetching recipes:', err);
        setError('Failed to fetch recipes. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [ingredients, filters, navigation]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.orange} />
        <Text style={styles.loadingText}>Fetching recipes...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={COLORS.orange} />
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: tabBarHeight }}
    >
      {recipes.length === 0 && (
        <Text style={{ color: COLORS.darkestGreen, fontSize: 18, textAlign: 'center', marginTop: 20 }}>
          No recipes found. Try adjusting your filters or ingredients.
        </Text>
      )}

      {recipes.map((recipe) => (
        <TouchableOpacity
          key={recipe.id}
          style={styles.card}
          onPress={() => navigation.navigate('SuggestedRecipeDetail', { recipe })}
        >
          <Image source={{ uri: recipe.image }} style={styles.image} />
          <Text style={styles.mealLabel}>Meal Name:</Text>
          <Text style={styles.mealName}>{recipe.title}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

//design
const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.lightestGreen,
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 50,
  },
  card: {
    backgroundColor: COLORS.white,
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: COLORS.darkestGreen,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
  },
  image: {
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  mealLabel: {
    fontSize: 14,
    color: COLORS.lighterGreen,
    marginTop: 4,
  },
  mealName: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.orange,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.lightestGreen,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: COLORS.darkestGreen,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.lightestGreen,
    paddingHorizontal: 20,
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    marginBottom: 20,
    textAlign: 'center',
  },
  backButton: {
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButtonText: {
    marginLeft: 8,
    color: COLORS.orange,
    fontSize: 16,
  },
});

export default SuggestedRecipeScreen;
