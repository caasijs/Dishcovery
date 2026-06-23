import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

//for the card. Data ng recipes na hardcoded
const recipeData = {
  1: {
    description:
      'A nourishing bowl packed with brown rice, steamed veggies, grilled tofu, and a zesty sesame-ginger dressing. NutriBap is your go-to post-workout meal, balancing carbs, proteins, and fiber in one wholesome plate.',
    recipe: {
      serves: 2,
      ingredients: [
        '1 cup cooked brown rice',
        '1/2 cup steamed broccoli',
        '1/2 cup sliced carrots',
        '100g grilled tofu',
        '2 tbsp sesame-ginger dressing',
        'Salt and pepper to taste',
      ],
      instructions: [
        'Arrange the brown rice in a bowl as your base.',
        'Layer the steamed broccoli and carrots on one side.',
        'Add grilled tofu slices on the other side.',
        'Drizzle sesame-ginger dressing on top.',
        'Season with salt and pepper, then serve warm.',
      ],
    },
  },
  2: {
    description:
      'A refreshing mix of greens, roasted chickpeas, and tangy vinaigrette. HearthyZest Salad is a crisp and satisfying option, perfect for clean eating and light dinners.',
    recipe: {
      serves: 2,
      ingredients: [
        '2 cups mixed greens',
        '1/2 cup roasted chickpeas',
        '1/4 cup diced cucumber',
        '1/4 cup cherry tomatoes, halved',
        '2 tbsp lemon vinaigrette',
        '1 tbsp feta cheese (optional)',
      ],
      instructions: [
        'In a large bowl, combine the greens, cucumbers, and tomatoes.',
        'Top with roasted chickpeas and feta (if using).',
        'Drizzle with lemon vinaigrette.',
        'Toss gently and serve immediately.',
      ],
    },
  },
  3: {
    description:
      'A healthy twist on Vietnamese pho with fresh herbs, veggie broth, and zucchini noodles. Green Pho Revival soothes your soul while staying light and detox-friendly.',
    recipe: {
      serves: 3,
      ingredients: [
        '4 cups veggie broth',
        '1 cup zucchini noodles',
        '1/2 cup sliced mushrooms',
        '1/2 cup bean sprouts',
        'Fresh basil and cilantro to garnish',
        '1 tbsp soy sauce',
      ],
      instructions: [
        'Bring the veggie broth to a boil in a pot.',
        'Add mushrooms and cook for 3–4 minutes.',
        'Add zucchini noodles and bean sprouts. Simmer for 2 minutes.',
        'Stir in soy sauce.',
        'Serve in bowls, topped with fresh herbs.',
      ],
    },
  },
  4: {
    description:
      'A protein-packed biryani with lean chicken, basmati rice, and fragrant spices. Chickenova Biryani is a guilt-free comfort food that hits all the right notes.',
    recipe: {
      serves: 4,
      ingredients: [
        '1 cup basmati rice',
        '200g chicken breast, cubed',
        '1/2 cup sliced onions',
        '1/4 cup plain yogurt',
        '2 tsp biryani masala',
        '1 tbsp olive oil',
        'Fresh coriander to garnish',
      ],
      instructions: [
        'Cook rice until 80% done. Set aside.',
        'In a pan, sauté onions in olive oil.',
        'Add chicken and cook until no longer pink.',
        'Stir in yogurt and biryani masala. Simmer for 5 minutes.',
        'Layer chicken and rice in a pot. Steam on low for 10 minutes.',
        'Garnish and serve hot.',
      ],
    },
  },
  5: {
    description:
      'A plant-based burger with a crispy patty, fresh lettuce, tomato, and vegan mayo, served in a whole wheat bun. The Ecobite Burger is both eco-conscious and delicious.',
    recipe: {
      serves: 1,
      ingredients: [
        '1 plant-based burger patty',
        '1 whole wheat bun',
        '1 lettuce leaf',
        '2 slices of tomato',
        '1 tbsp vegan mayo',
        '1 tsp mustard',
      ],
      instructions: [
        'Pan-fry or grill the patty until crisp.',
        'Toast the bun lightly.',
        'Assemble: bun, mayo, lettuce, patty, tomato, mustard, top bun.',
        'Serve with a side of air-fried sweet potato fries.',
      ],
    },
  },
};

const RecipeDetailScreen = ({ route }) => {
  const { meals } = route.params || {}; 
  const navigation = useNavigation();
  
  // to access the recipe data based sa id
  const { description, recipe } = meals ? recipeData[meals.id] : {};

  return (
    <ScrollView contentContainerStyle={styles.container}>

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#342d1c" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Recipe Details</Text>
        <View style={{ width: 24 }} />
      </View>

      <Image source={meals.image} style={styles.image} />

      <Text style={styles.title}>{meals.name}</Text>
      <Text style={styles.description}>{description}</Text>

      <View style={styles.divider} />

      <Text style={styles.subtitle}>👨‍🍳 Serving size: {recipe?.serves || 'N/A'} people</Text>

      <Text style={styles.sectionTitle}>🛒 Ingredients</Text>
      {recipe?.ingredients?.map((item, index) => (
        <Text key={index} style={styles.recipeText}>• {item}</Text>
      ))}

      <Text style={styles.sectionTitle}>👩‍🍳 Instructions</Text>
      {recipe?.instructions?.map((step, index) => (
        <Text key={index} style={styles.recipeText}>{index + 1}. {step}</Text>
      ))}
    </ScrollView>
  );
};

//design
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#dfebbe',
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
    color: '#342d1c',
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
    color: '#342d1c',
    marginBottom: 6,
  },
  description: {
    fontSize: 16,
    color: '#536632',
    marginBottom: 10,
    lineHeight: 22,
  },
  divider: {
    height: 1,
    backgroundColor: '#cb7830',
    marginVertical: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#342d1c',
    marginBottom: 10,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#cb7830',
    marginTop: 15,
    marginBottom: 6,
  },
  recipeText: {
    fontSize: 15,
    color: '#342d1c',
    marginBottom: 6,
    lineHeight: 20,
  },
  errorText: {
    fontSize: 20,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default RecipeDetailScreen;
