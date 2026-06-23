import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Modal, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

//navigate
const SettingsDetailScreen = ({ route, navigation }) => {
  const { title, user, onSave } = route.params || {};

  //useState na state hook
  const [name, setName] = useState(user?.name || 'Lana Del Rey');
  const [email, setEmail] = useState(user?.email || '1anaLover@gmail.com');
  const [phone, setPhone] = useState(user?.phone || '09692191785');  

  const [isEditing, setIsEditing] = useState(false);

  //modal 
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showValidationModal, setShowValidationModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [validationMessage, setValidationMessage] = useState('');

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSave = () => {
    if (!name.trim() || !email.trim() || !phone.trim()) {
      setValidationMessage('All fields must be filled out.');
      setShowValidationModal(true);
      return;
    }

    const updatedUser = { name, email, phone };
    if (onSave) onSave(updatedUser);

    setShowSuccessModal(true);
    setIsEditing(false);
  };

  const handlePasswordChange = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      setValidationMessage('Please fill out all password fields.');
      setShowValidationModal(true);
      return;
    }
    if (newPassword !== confirmPassword) {
      setValidationMessage('New passwords do not match.');
      setShowValidationModal(true);
      return;
    }

    setShowPasswordModal(false);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setShowSuccessModal(true);
  };

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    setShowLogoutModal(false);
    navigation.navigate('Auth');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={28} color="#333" />
        </TouchableOpacity>
        <Text style={styles.title}>{title || 'Settings'}</Text>
      </View>

      {title === 'Profile' && (
        <View style={styles.formContainer}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            editable={isEditing}
          />

          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            editable={isEditing}
          />

          <Text style={styles.label}>Phone</Text>
          <TextInput
            style={styles.input}
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            editable={isEditing}
          />

          {isEditing ? (
            <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => setIsEditing(true)} style={styles.saveButton}>
              <Text style={styles.saveButtonText}>Edit Profile</Text>
            </TouchableOpacity>
          )}
        </View>
      )}

      {title === 'Change Password' && (
        <View style={styles.formContainer}>
          <Text style={styles.label}>Current Password</Text>
          <TextInput
            placeholder="Current Password"
            secureTextEntry
            value={currentPassword}
            onChangeText={setCurrentPassword}
            style={styles.input}
          />
          <Text style={styles.label}>New Password</Text>
          <TextInput
            placeholder="New Password"
            secureTextEntry
            value={newPassword}
            onChangeText={setNewPassword}
            style={styles.input}
          />
          <Text style={styles.label}>Confirm Password</Text>
          <TextInput
            placeholder="Confirm Password"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            style={styles.input}
          />
          <TouchableOpacity onPress={handlePasswordChange} style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
      )}

{title === 'About Us' && (
  <View style={styles.aboutContainer}>
    <View style={styles.appHeaderContainer}>
      <Image
        source={require('../assets/logo.png')} // Replace with your actual path
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.appTitle}>DISHcovery</Text>
      <Text style={styles.appSubtitle}>Your Key to Delicious Dishes and Sustainable Discoveries</Text>
    </View>
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <Text style={styles.sectionTitle}>Project Overview</Text>
      <Text style={styles.aboutText}>
        DISHcovery emerged as a final project for IT 110: Integrative Programming and Technology 1 and IT ELECT 1B: Mobile Application Development 1, born from the collaborative efforts of Janella Shaira N. Caasi, Aericka Dhenizze M. Juan, Ellah Charlene Abenes, and Neil Justin F. Monje, under the guidance of Ms. Kathleen Maria V. Dioquino and Mr. Fernando Jose Bautista.
      </Text>
      <Text style={styles.sectionTitle}>What is DISHcovery?</Text>
      <Text style={styles.aboutText}>
        More than just a recipe app, DISHcovery is your intelligent culinary partner dedicated to simplifying meal preparation while championing sustainability. Imagine effortlessly transforming the ingredients you already have into mouthwatering and nutritious dishes. That's the magic of DISHcovery. Simply input your available items, and our smart system instantly generates tailored recipes, powered by the extensive Spoonacular API.
      </Text>

      <Text style={styles.sectionTitle}>Sustainability Focus</Text>
      <Text style={styles.aboutText}>
        But our vision extends beyond the plate. DISHcovery empowers you to make informed food choices by providing comprehensive nutritional breakdowns for every recipe, directly supporting SDG 3: Good Health and Well-being. We believe in nourishing both your body and the planet.
      </Text>

      <Text style={styles.sectionTitle}>Food Waste Wizard</Text>
      <Text style={styles.aboutText}>
        That's why DISHcovery takes a revolutionary approach to food waste. Instead of discarding scraps, our innovative "Food Waste Wizard," driven by AI algorithms, offers ingenious and sustainable repurposing ideas. From transforming vegetable peels into flavorful broths to suggesting composting methods, we help you see the potential in every part of your food.
      </Text>

      <Text style={styles.sectionTitle}>Key Features</Text>
      <Text style={styles.aboutText}>
        To further enhance your culinary journey, DISHcovery offers:
      </Text>
      <Text style={styles.aboutText}>
        - Ingredient-Based Recipe Generation: Unleash your inner chef by discovering a plethora of recipes based on the ingredients you have on hand, courtesy of the vast Spoonacular API.
      </Text>
      <Text style={styles.aboutText}>
        - Smart Nutrition Analysis: Gain valuable insights into the nutritional content of your meals, empowering you to make healthier choices aligned with your well-being goals.
      </Text>
      <Text style={styles.aboutText}>
        - Food Waste Wizard: Embrace sustainability with creative suggestions for utilizing food scraps, minimizing waste and maximizing resources.
      </Text>
      <Text style={styles.aboutText}>
        - Dietary Preference & Allergen Filters: Customize your recipe search to perfectly match your dietary needs and allergies, ensuring a seamless and safe culinary experience.
      </Text>
      <Text style={styles.aboutText}>
        - Sustainability Tips & Eco Reminders: Integrate eco-conscious practices into your daily routine with helpful tips and reminders on reducing food waste, sustainable shopping, and energy-efficient cooking.
      </Text>

      <Text style={styles.sectionTitle}>Technology Behind DISHcovery</Text>
      <Text style={styles.aboutText}>
        At the heart of DISHcovery lies a powerful integration of the Spoonacular API and sophisticated AI-powered algorithms. The Spoonacular API fuels our recipe generation, nutritional analysis, and dietary filtering capabilities, providing a rich and diverse culinary database. Complementing this, our AI algorithms drive the innovative Food Waste Wizard and deliver personalized sustainability tips, learning from your habits to encourage a greener kitchen.
      </Text>

      <Text style={styles.sectionTitle}>The Future of DISHcovery</Text>
      <Text style={styles.aboutText}>
        DISHcovery is more than just an application; it's a step towards a more delicious, healthy, and sustainable future, starting right in your kitchen.
      </Text>
    </ScrollView>
  </View>
)}


      {title === 'Logout' && (
        <TouchableOpacity onPress={handleLogout} style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Logout</Text>
        </TouchableOpacity>
      )}

      <Modal visible={showLogoutModal} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Are you sure you want to logout?</Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity onPress={() => setShowLogoutModal(false)} style={styles.modalButton}>
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={confirmLogout} style={styles.modalButton}>
                <Text style={styles.modalButtonText}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Modal visible={showValidationModal} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>{validationMessage}</Text>
            <TouchableOpacity onPress={() => setShowValidationModal(false)} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal visible={showSuccessModal} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Saved successfully!</Text>
            <TouchableOpacity
              onPress={() => {
                setShowSuccessModal(false);
                navigation.goBack();
              }}
              style={styles.closeButton}
            >
              <Text style={styles.closeButtonText}>OK</Text>
            </TouchableOpacity>
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
    backgroundColor: '#dfebbe',
    padding: 24,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center', // Center everything in the header container
    marginTop: 20,
    marginBottom: 20,
  },
  appHeaderContainer:{
    alignItems: 'center', // Center everything in the header container
    justifyContent: 'center', // Align items to the center
    marginBottom: 5,
  },
  backButton: {
    marginLeft: 0,
  },
  label: {
    fontSize: 16,
    marginBottom: 6,
    color: '#342d1c',
  },
  input: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 18,
    minHeight: 60,
    marginBottom: 15,
    fontSize: 16,
    color: '#342d1c',
  },
  title: {
    fontSize: 32,
  fontWeight: 'bold',
  color: '#342d1c',
  textAlign: 'center', // Centers the title
  flex: 1, // This makes the title take up remaining space
},
  aboutContainer: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginTop: 20,
    flex: 1,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 5,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 5,
  },
  appTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#342d1c',
    textAlign: 'center',
  },
  appSubtitle: {
    fontSize: 16,
    color: '#536632',
    textAlign: 'center',
    marginBottom: 5,
    fontStyle: 'italic', // Corrected 'italic' from 'itelic'
  },
  scrollViewContent: {
    paddingBottom: 50, // Ensure content is spaced from the bottom
    paddingTop: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#cb7830',
    marginTop: 20,
  },
  aboutTextContainer: {
    marginTop: 20,
  },
  aboutText: {
    fontSize: 16,
    color: '#342d1c',
    lineHeight: 24,
    marginTop: 10,
    textAlign: 'justify',
  },
  saveButton: {
    backgroundColor: '#cb7830',
    padding: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '85%',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    backgroundColor: '#cb7830',
    padding: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: '45%',
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  closeButton: {
    backgroundColor: '#cb7830',
    padding: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  formContainer: {
    marginBottom: 20,
  },
  });
  export default SettingsDetailScreen;