//this is where the user will login/signup (Authentication screen)
import React, { useState } from 'react';
import { Image, View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, Modal } from 'react-native';

export default function AuthScreen({ navigation }) {
  //dito ma-ta-track kung signup or login tab
  const [selected, setSelected] = useState('signup');

  //show/hide password
  const [passwordVisible, setPasswordVisible] = useState(false);

  //user inputs
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  //modal para sa validation error
  const [isModalVisible, setIsModalVisible] = useState(false);

  //para ma-toggle password visibility
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  //validation for signup/login -- all fields dapat may laman
  const handleSignUp = () => {
    if (!email || !username || !password) {
      setIsModalVisible(true);
      return;
    }
    navigation.navigate('Main');
  };
  const handleLogin = () => {
    if (!email || !password) {
      setIsModalVisible(true);
      return;
    }
    navigation.navigate('Main');
  };


  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >

      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/logo.png')}
          style={styles.logo}
        />
        <Text style={styles.title}>DISHcovery</Text>
        <Text style={styles.subtitle}>
          Your Key to Delicious Dishes {"\n"} and Sustainable Discoveries.
        </Text>
      </View>

      <View style={styles.formContainer}>
        <View style={styles.toggleContainer}>
          <TouchableOpacity
            style={[styles.toggleButton, selected === 'signup' && styles.selectedButton]}
            onPress={() => setSelected('signup')}
          >
            <Text
              style={[styles.toggleText, selected === 'signup' && styles.selectedText]}
            >
              Sign Up
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.toggleButton, selected === 'login' && styles.selectedButton]}
            onPress={() => setSelected('login')}
          >
            <Text
              style={[styles.toggleText, selected === 'login' && styles.selectedText]}
            >
              Log In
            </Text>
          </TouchableOpacity>
        </View>

        {selected === 'signup' ? (
          <>
            <TextInput
              style={styles.input}
              placeholder="Email or Phone Number"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
            <TextInput
              style={styles.input}
              placeholder="Username"
              value={username}
              onChangeText={setUsername}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry={!passwordVisible}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={togglePasswordVisibility}>
              <Text style={styles.showHideText}>
                {passwordVisible ? 'Hide Password' : 'Show Password'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={handleSignUp}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setSelected('login')}>
              <Text style={styles.switchText}>
                Already have an account?{' '}
                <Text style={styles.loginLink}>Login</Text>
              </Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TextInput
              style={styles.input}
              placeholder="Email or Phone Number"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry={!passwordVisible}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={togglePasswordVisibility}>
              <Text style={styles.showHideText}>
                {passwordVisible ? 'Hide Password' : 'Show Password'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>Log In</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setSelected('signup')}>
              <Text style={styles.switchText}>
                Don't have an account?{' '}
                <Text style={styles.registerLink}>Register</Text>
              </Text>
            </TouchableOpacity>
          </>
        )}
      </View>

      <Modal
        visible={isModalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Please fill in all fields!</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setIsModalVisible(false)}
            >
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}

//REFERENCE FOR COLORS
  // orange: '#cb7830',
  // lightestGreen: '#dfebbe', -- background color all thru out
  // darkestGreen: '#342d1c',
  // lighterGreen: '#536632',
  // lightGreen: '#82a749',
  // white: '#FFFFFF',

//design
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dfebbe', 
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    justifyContent: 'center',
    width: 250,
    height: 250,
    alignSelf: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#342d1c',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#536632',
    textAlign: 'center',
    marginBottom: 40,
  },
  formContainer: {
    backgroundColor: '#dfebbe', 
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 12,
    backgroundColor: '#82a749',
    alignItems: 'center',
    marginHorizontal: 5,
    borderRadius: 8,
  },
  selectedButton: {
    backgroundColor: '#cb7830',
  },
  toggleText: {
    color: '#ffffff90',
    fontSize: 16,
    fontWeight: 'bold',
  },
  selectedText: {
    color: '#dfebbe',
  },
  input: {
    height: 45,
    borderColor: '#82a749',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingLeft: 10,
  },
  button: {
    backgroundColor: '#cb7830',
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  buttonText: {
    color: '#ffffff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  showHideText: {
    color: '#82a749',
    textAlign: 'center',
    marginBottom: 20,
  },
  switchText: {
    textAlign: 'center',
    fontSize: 16,
  },
  loginLink: {
    color: '#82a749',
    textDecorationLine: 'underline',
  },
  registerLink: {
    color: '#82a749',
    textDecorationLine: 'underline',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    color: '#333',
    marginBottom: 15,
  },
  modalButton: {
    backgroundColor: '#cb7830',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
});
