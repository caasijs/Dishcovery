import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator, } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as Speech from 'expo-speech';
import AsyncStorage from '@react-native-async-storage/async-storage';

//basis ng color ng app
const COLORS = {
  orange: '#cb7830',
  lightestGreen: '#dfebbe',
  darkestGreen: '#342d1c',
  lighterGreen: '#536632',
  lightGreen: '#82a749',
  white: '#fff',
};

//API_KEY para no need ilagay yung maraming numbers and letters
const API_KEY = '44e34caf9b3a49189c642fab17928d66';

//navigation
const SuggestedRecipeDetailScreen = ({ navigation, route }) => {
  const { recipe } = route.params;
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentSection, setCurrentSection] = useState(null);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [selectedStars, setSelectedStars] = useState(0);

  //to fetch picture, description(summary), serving size, ingredients, instructions, and nutritional value
  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const infoResponse = await fetch(
          `https://api.spoonacular.com/recipes/${recipe.id}/information?includeNutrition=true&apiKey=${API_KEY}`
        );
        const infoData = await infoResponse.json();

        const summaryResponse = await fetch(
          `https://api.spoonacular.com/recipes/${recipe.id}/summary?apiKey=${API_KEY}`
        );
        const summaryData = await summaryResponse.json();

        setDetails({ ...infoData, summary: summaryData.summary });
      } catch (error) {
        console.error('Error fetching recipe details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipeDetails();
  }, [recipe.id]);

  //if walang description yung recipe/meal
  const cleanSummary = details?.summary
    ? details.summary.replace(/<[^>]*>/g, '')
    : 'No description available.';

  const ingredientsText = details?.extendedIngredients
    ? details.extendedIngredients.map((item) => item.original).join(', ')
    : '';

  const instructionsText = details?.instructions
    ? details.instructions.replace(/<[^>]*>/g, '')
    : 'No instructions provided.';

  //expo speech. text-to-speech
  const startSpeech = (text, section) => {
    if (isSpeaking) {
      Speech.stop();
    }
    setCurrentSection(section);
    Speech.speak(text, {
      onStart: () => setIsSpeaking(true),
      onDone: () => {
        setIsSpeaking(false);
        setCurrentSection(null);
      },
      onStopped: () => {
        setIsSpeaking(false);
        setCurrentSection(null);
      },
    });
  };

  //for the speech to stop
  const stopSpeech = () => {
    Speech.stop();
    setIsSpeaking(false);
    setCurrentSection(null);
  };

  //to rate the recipe/meal
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <TouchableOpacity
          key={i}
          onPress={() => setSelectedStars(i)}
          style={{ marginHorizontal: 4 }}
          accessibilityLabel={`Rate ${i} star${i > 1 ? 's' : ''}`}
        >
          <Ionicons
            name={i <= selectedStars ? 'star' : 'star-outline'}
            size={32}
            color={COLORS.orange}
          />
        </TouchableOpacity>
      );
    }
    return <View style={styles.starRow}>{stars}</View>;
  };

  //asyncStorage para ma-save yung mga in-fetch
  const saveToHistory = async () => {
    try {
      const newEntry = {
        id: recipe.id,
        title: details.title,
        image: details.image,
        rating: selectedStars,
      };

      const existingHistory = await AsyncStorage.getItem('recipeHistory');
      const parsedHistory = existingHistory ? JSON.parse(existingHistory) : [];

      const updatedHistory = parsedHistory.filter(item => item.id !== newEntry.id);
      updatedHistory.unshift(newEntry);

      await AsyncStorage.setItem('recipeHistory', JSON.stringify(updatedHistory));
    } catch (error) {
      console.error('Failed to save history:', error);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.orange} />
      </View>
    );
  }

  //if walang recipe na compatible sa nilagay ni user
  if (!details) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.errorText}>Failed to load recipe details.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} accessibilityLabel="Go back">
            <Ionicons name="arrow-back" size={24} color={COLORS.darkestGreen} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Recipe Details</Text>
          <View style={{ width: 24 }} />
        </View>

        <Image source={{ uri: details.image }} style={styles.image} />
        <Text style={styles.title}>{details.title}</Text>
        <Text style={styles.description}>{cleanSummary}</Text>

        <View style={styles.ttsRow}>
          <TouchableOpacity
            style={[
              styles.ttsButton,
              isSpeaking && currentSection === 'summary' && styles.activeButton,
            ]}
            onPress={() => startSpeech(cleanSummary, 'summary')}
            accessibilityLabel="Read summary aloud"
          >
            <Text style={styles.ttsText}>🔊 Read Summary</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.controlButton}
            onPress={stopSpeech}
            accessibilityLabel="Stop reading"
          >
            <Text style={styles.controlText}>🛑 Stop</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.divider} />

        <Text style={styles.subtitle}>
          👨‍🍳 Serving size: {details.servings} people
        </Text>

        <Text style={styles.sectionTitle}>🛒 Ingredients</Text>
        {details.extendedIngredients.map((item) => (
          <Text key={item.id} style={styles.recipeText}>• {item.original}</Text>
        ))}
        <View style={styles.ttsRow}>
          <TouchableOpacity
            style={[
              styles.ttsButton,
              isSpeaking && currentSection === 'ingredients' && styles.activeButton,
            ]}
            onPress={() => startSpeech(ingredientsText, 'ingredients')}
            accessibilityLabel="Read ingredients aloud"
          >
            <Text style={styles.ttsText}>🔊 Read Ingredients</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.controlButton}
            onPress={stopSpeech}
            accessibilityLabel="Stop reading"
          >
            <Text style={styles.controlText}>🛑 Stop</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>👩‍🍳 Instructions</Text>
        {instructionsText
          .split(/(?<=[.!?])\s+/)
          .map((sentence, index) => (
            <Text key={index} style={styles.recipeText}>
              {`${index + 1}. ${sentence.trim()}`}
            </Text>
          ))}
        <View style={styles.ttsRow}>
          <TouchableOpacity
            style={[
              styles.ttsButton,
              isSpeaking && currentSection === 'instructions' && styles.activeButton,
            ]}
            onPress={() => startSpeech(instructionsText, 'instructions')}
            accessibilityLabel="Read instructions aloud"
          >
            <Text style={styles.ttsText}>🔊 Read Instructions</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.controlButton}
            onPress={stopSpeech}
            accessibilityLabel="Stop reading"
          >
            <Text style={styles.controlText}>🛑 Stop</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>🧪 Nutritional Value</Text>
        {details.nutrition?.nutrients?.map((nutrient, index) => (
          <Text key={index} style={styles.recipeText}>
            {nutrient.name}: {nutrient.amount} {nutrient.unit}
          </Text>
        ))}


        <Text style={styles.sectionTitle}>♻️ Scrap Usage</Text>

        <Text style={styles.subsectionTitle}>1. Vegetable and Fruit Seeds</Text>
        <Text style={styles.recipeText}>• Citrus Seeds: Clean and plant them ½ inch deep in moist soil.</Text>
        <Text style={styles.recipeText}>• Avocado Pits: Suspend over water using toothpicks.</Text>
        <Text style={styles.recipeText}>• Root Vegetables: Place tops of carrots or beets in shallow water.</Text>

        <Text style={styles.subsectionTitle}>2. Vegetable and Fruit Peels</Text>
        <Text style={styles.recipeText}>• Banana Peels: Chop and bury them in soil.</Text>
        <Text style={styles.recipeText}>• Citrus Peels: Soak in water and use as natural fertilizer.</Text>
        <Text style={styles.recipeText}>• General Peels: Compost peels to enrich soil.</Text>

        <Text style={styles.subsectionTitle}>3. Other Kitchen Scraps</Text>
        <Text style={styles.recipeText}>• Coffee Grounds: Sprinkle used grounds around plants.</Text>
        <Text style={styles.recipeText}>• Eggshells: Crush and mix into soil for calcium.</Text>
        <Text style={styles.recipeText}>• Cooking Water: Use cooled vegetable water for plants.</Text>

        <View style={{ alignItems: 'center', marginVertical: 20 }}>
          <TouchableOpacity
            style={styles.ratingButton}
            onPress={() => setShowRatingModal(true)}
            accessibilityLabel="Rate this recipe"
          >
            <Text style={styles.ratingButtonText}>⭐ Rate this Recipe!</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {showRatingModal && (
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>How many stars?</Text>
            {renderStars()}
            <TouchableOpacity
              style={[
                styles.doneButton,
                selectedStars === 0 && { backgroundColor: '#536632' }
              ]}
              disabled={selectedStars === 0}
              onPress={async () => {
                setShowRatingModal(false);
                await saveToHistory();
                navigation.getParent()?.navigate('History');
              }}
              accessibilityLabel={
                selectedStars === 0
                  ? 'Select stars before submitting rating'
                  : 'Submit rating and go to History'
              }
            >
              <Text style={styles.doneButtonText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

//design
const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.lightestGreen,
    flex: 1,
  },
  scrollContainer: {
    padding: 20,
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.darkestGreen,
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 12,
    marginBottom: 15,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: COLORS.darkestGreen,
    marginBottom: 6,
  },
  description: {
    fontSize: 16,
    color: COLORS.lighterGreen,
    marginBottom: 10,
    lineHeight: 22,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.orange,
    marginVertical: 10,
  },
  subtitle: {
    fontSize: 18,
    color: COLORS.darkestGreen,
    marginBottom: 6,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.darkestGreen,
    marginTop: 20,
    marginBottom: 6,
  },
  subsectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.lighterGreen,
    marginTop: 10,
  },
  recipeText: {
    fontSize: 16,
    color: COLORS.darkestGreen,
    marginBottom: 2,
    lineHeight: 22,
  },
  ttsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  ttsButton: {
    backgroundColor: COLORS.orange,
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 30,
    marginRight: 10,
  },
  activeButton: {
    backgroundColor: COLORS.lighterGreen,
  },
  ttsText: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
  controlButton: {
    backgroundColor: COLORS.lightGreen,
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 30,
  },
  controlText: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
  ratingButton: {
    backgroundColor: COLORS.orange,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 40,
    alignSelf: 'center',
  },
  ratingButtonText: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 18,
  },
  modalOverlay: {
    position: 'absolute',
    backgroundColor: 'rgba(0,0,0,0.6)',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: COLORS.lightestGreen,
    width: 300,
    borderRadius: 20,
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.darkestGreen,
    marginBottom: 20,
  },
  starRow: {
    flexDirection: 'row',
    marginBottom: 30,
  },
  doneButton: {
    backgroundColor: COLORS.orange,
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 40,
  },
  doneButtonText: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 18,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: COLORS.lightestGreen,
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginHorizontal: 20,
  },
});

export default SuggestedRecipeDetailScreen;
