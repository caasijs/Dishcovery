import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, Animated, Easing } from 'react-native';
import { useNavigation } from '@react-navigation/native';

//pinaka unang makikita
const SplashScreen = () => {
  const progress = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();

  useEffect(() => {
    Animated.timing(progress, {
      toValue: 1,
      duration: 2000,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start();

    const timer = setTimeout(() => {
      navigation.replace('Auth');
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const widthInterpolated = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '80%'],
  });

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo} resizeMode="contain" />
      <Text style={styles.title}>DISHcovery</Text>
      <Text style={styles.subtitle}>
        Your Key to Delicious Dishes {"\n"} and Sustainable Discoveries.
      </Text>
      <Animated.View style={[styles.progressBar, { width: widthInterpolated }]} />
    </View>
  );
};

//design
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dfebbe',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  logo: {
    width: 350,
    height: 350,
    marginBottom: 20,
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
  progressBar: {
    height: 8,
    backgroundColor: '#cb7830',
    borderRadius: 10,
    marginTop: 20,
    width: '0%',
  },
});

export default SplashScreen;
