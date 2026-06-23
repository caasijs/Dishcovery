import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Modal, Dimensions, } from 'react-native';

//basis para sa color
const COLORS = {
  orange: '#cb7830',
  lightestGreen: '#dfebbe',
  darkestGreen: '#342d1c',
  lighterGreen: '#536632',
  lightGreen: '#82a749',
  white: '#fff',
};

//to make the layouts from different devices responsive
const screenWidth = Dimensions.get('window').width;

//useState
const IngredientsScreen = ({ navigation }) => {
  const [ingredients, setIngredients] = useState('');
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    diet: [],
    intolerances: [],
    cuisine: [],
    type: [],
  });

  //for the filter to work
  const toggleFilter = (category, value) => {
    const categoryKey =
      category === 'Meal Type'
        ? 'type'
        : category.toLowerCase(); // "Diet" -> "diet", "Intolerances" -> "intolerances", "Cuisine" -> "cuisine"

    setSelectedFilters(prev => {
      const isSelected = prev[categoryKey].includes(value);
      return {
        ...prev,
        [categoryKey]: isSelected
          ? prev[categoryKey].filter(item => item !== value)
          : [...prev[categoryKey], value],
      };
    });
  };

  //i-navigate sa SuggestedRecipeDetailsScreen
  const handleGenerate = () => {
    navigation.navigate('SuggestedRecipe', {
      ingredients,
      filters: selectedFilters,
    });
  };

  //buttons inside the filter drawer
  const filterButtons = {
    'Meal Type': [
      'main course', 'side dish', 'dessert', 'appetizer', 'salad', 'bread',
      'breakfast', 'soup', 'beverage', 'sauce', 'marinade', 'fingerfood',
      'snack', 'drink'
    ],
    Diet: [
      'gluten free', 'ketogenic', 'vegetarian', 'lacto-vegetarian',
      'ovo-vegetarian', 'vegan', 'pescetarian', 'paleo', 'primal', 'low FODMAP', 'whole30'
    ],
    Intolerances: [
      'dairy', 'egg', 'gluten', 'grain', 'peanut', 'seafood', 'sesame',
      'shellfish', 'soy', 'sulfite', 'tree nut', 'wheat'
    ],
    Cuisine: [
      'African', 'American', 'British', 'Cajun', 'Caribbean', 'Chinese', 'Eastern European',
      'European', 'French', 'German', 'Greek', 'Indian', 'Irish', 'Italian', 'Japanese',
      'Jewish', 'Korean', 'Latin American', 'Mediterranean', 'Mexican', 'Middle Eastern',
      'Nordic', 'Southern', 'Spanish', 'Thai', 'Vietnamese'
    ]
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Build Your Recipe</Text>

      <TouchableOpacity
        style={styles.filterButton}
        onPress={() => setDrawerVisible(true)}
      >
        <Text style={styles.filterButtonText}>Filter</Text>
      </TouchableOpacity>

      <Text style={styles.label}>Ingredients</Text>
      <TextInput
        style={styles.input}
        multiline
        value={ingredients}
        onChangeText={setIngredients}
        placeholder="e.g. flour, milk, pepper"
        placeholderTextColor={COLORS.lighterGreen}
      />

      <TouchableOpacity style={styles.generateButton} onPress={handleGenerate}>
        <Text style={styles.generateButtonText}>Suggest Recipe</Text>
      </TouchableOpacity>

      <Modal visible={drawerVisible} animationType="slide" transparent>
        <View style={styles.drawerOverlay}>
          <View style={styles.drawer}>
            <ScrollView>
              <Text style={styles.drawerTitle}>Options</Text>
              {Object.entries(filterButtons).map(([section, values]) => (
                <View key={section} style={styles.section}>
                  <Text style={styles.sectionTitle}>{section}</Text>
                  <View style={styles.buttonContainer}>
                    {values.map(value => {
                      const key =
                        section === 'Meal Type'
                          ? 'type'
                          : section.toLowerCase();
                      const isSelected = selectedFilters[key]?.includes(value);
                      return (
                        <TouchableOpacity
                          key={value}
                          style={[
                            styles.optionButton,
                            isSelected && styles.optionButtonSelected,
                          ]}
                          onPress={() => toggleFilter(section, value)}
                        >
                          <Text
                            style={[
                              styles.optionButtonText,
                              isSelected && styles.optionButtonTextSelected,
                            ]}
                          >
                            {value}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </View>
              ))}
              <TouchableOpacity
                style={styles.saveButton}
                onPress={() => setDrawerVisible(false)}
              >
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

//design
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightestGreen,
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.darkestGreen,
    alignSelf: 'center',
    marginVertical: 20,
  },
  filterButton: {
    backgroundColor: COLORS.lighterGreen,
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 25,
    alignSelf: 'flex-start',
    marginBottom: 30,
    shadowColor: COLORS.darkestGreen,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  filterButtonText: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
    color: COLORS.lighterGreen,
    fontWeight: '600',
  },
  input: {
    backgroundColor: COLORS.white,
    color: COLORS.lighterGreen,
    borderRadius: 15,
    padding: 18,
    minHeight: 80,
    marginBottom: 25,
    fontSize: 16,
    shadowColor: COLORS.darkestGreen,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  generateButton: {
    backgroundColor: COLORS.orange,
    paddingVertical: 16,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: COLORS.darkestGreen,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  generateButtonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  drawerOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  drawer: {
    backgroundColor: COLORS.white,
    width: screenWidth * 0.8,
    height: '100%',
    padding: 20,
    borderRightWidth: 2,
    borderColor: COLORS.lighterGreen,
  },
  drawerTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: COLORS.orange,
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.darkestGreen,
    borderBottomWidth: 2,
    borderBottomColor: COLORS.lighterGreen,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  optionButton: {
    borderWidth: 1,
    borderColor: COLORS.lighterGreen,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 8,
    backgroundColor: COLORS.white,
  },
  optionButtonSelected: {
    backgroundColor: COLORS.lightGreen,
  },
  optionButtonText: {
    color: COLORS.darkestGreen,
    fontSize: 14,
  },
  optionButtonTextSelected: {
    color: COLORS.white,
  },
  othersInput: {
    height: 80,
    borderWidth: 1,
    borderColor: COLORS.lighterGreen,
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    backgroundColor: COLORS.lightestGreen,
    color: COLORS.darkestGreen,
  },
  saveButton: {
    backgroundColor: COLORS.lighterGreen,
    padding: 12,
    borderRadius: 20,
    alignItems: 'center',
    marginTop: 10,
  },
  saveButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default IngredientsScreen;