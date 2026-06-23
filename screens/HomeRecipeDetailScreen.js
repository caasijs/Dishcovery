import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

//hardcoded
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
        '500g chicken breast, diced',
        '1 cup basmati rice',
        '1 onion, sliced',
        '2 cloves garlic, minced',
        '1 tbsp garam masala',
        '1/4 cup yogurt',
        '2 cups chicken broth',
        'Fresh cilantro to garnish',
      ],
      instructions: [
        'Sauté onion and garlic in a pan until fragrant.',
        'Add diced chicken and garam masala, cooking until the chicken is browned.',
        'Stir in rice, yogurt, and chicken broth.',
        'Cover and cook for 15 minutes, or until rice is tender.',
        'Garnish with cilantro before serving.',
      ],
    },
  },
  5: {
    description:
      'A hearty, plant-based burger made with mashed sweet potatoes and black beans, topped with avocado and served on a toasted whole grain bun. The Ecobite Burger is packed with nutrients and flavor.',
    recipe: {
      serves: 2,
      ingredients: [
        '1 cup mashed sweet potatoes',
        '1/2 cup black beans, mashed',
        '1/4 cup breadcrumbs',
        '1 tsp smoked paprika',
        '1 avocado, sliced',
        'Whole grain buns',
        'Lettuce, tomato, and onion for garnish',
      ],
      instructions: [
        'Mix sweet potatoes, black beans, breadcrumbs, and paprika.',
        'Form into patties and pan-fry until golden brown.',
        'Toast the whole grain buns and assemble with avocado, lettuce, tomato, and onion.',
      ],
    },
  },
};


const HomeRecipeDetailScreen = ({ route }) => {
  const navigation = useNavigation();
  const { recipe } = route.params;

  const currentData = recipeData[recipe.id];

  if (!recipe || !currentData) {
    return <Text style={styles.errorText}>Recipe not found!</Text>;
  }

  const { description, recipe: recipeDetails } = currentData;

  return (
    <ScrollView contentContainerStyle={styles.container}>

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#342d1c" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Recipe Details</Text>
        <View style={{ width: 24 }} />
      </View>

      <Image source={recipe.image} style={styles.image} />

      <Text style={styles.description}>{description}</Text>

      <View style={styles.divider} />

      <Text style={styles.subtitle}>👨‍🍳 Serving size: {recipeDetails.serves} people</Text>

      <Text style={styles.sectionTitle}>🛒 Ingredients</Text>
      {recipeDetails.ingredients.map((item, index) => (
        <Text key={index} style={styles.recipeText}>• {item}</Text>
      ))}

      <Text style={styles.sectionTitle}>👩‍🍳 Instructions</Text>
      {recipeDetails.instructions.map((step, index) => (
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
    width: 300,
    height: 300,
    borderRadius: 12,
    marginBottom: 15,
    alignSelf: 'center', 
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

export default HomeRecipeDetailScreen;
