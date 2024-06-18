import React, { useState } from 'react';
import { View, StyleSheet, Image, Text, TextInput, TouchableOpacity, Dimensions, Platform, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');


function SignIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleSignIn = () => {
    fetch('http://141.147.151.192:8080/login.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`,
    })
      .then(response => response.json())
      .then(data => {
        if (data.status === 'success') {
          Alert.alert('Success', `Welcome, ${data.username}!`);
        } else {
          Alert.alert('Error', data.message);
        }
      })
      .catch(error => {
        console.error('Error:', error);
        Alert.alert('Error', 'An error occurred. Please try again.');
      });
  };

  return (
    Platform.OS === 'ios' || Platform.OS === 'android' ? (
    <View style={styles.container}>
      <View style={styles.imageWrapper}>
        <Image 
          resizeMode="contain" 
          style={styles.logo} 
        />
      </View>
      <View style={styles.titleSection}>
        <Text style={styles.title}>Sign in to your account</Text>
        <Text style={styles.label}>Enter your email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your username"
          value={username}
          onChangeText={setUsername}
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
          />
          <TouchableOpacity style={styles.submitButton} onPress={handleSignIn}>
            <Text style={styles.submitButtonText}>Sign in</Text>
          </TouchableOpacity>
      </View>
    </View> 

    ) : (
    <View style={styles.container}>
      <View style={styles.leftContainer}>
        <View style={styles.imageWrapper}>
          <Image
            resizeMethod="auto"
            style={styles.logo} 
          />
        </View>
      </View>
      <View style={styles.rightContainer}>
        <View style={styles.formWrapper}>
          <Text style={styles.title}>Sign in to your account</Text>
            <Text style={styles.label}>Username</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your username"
              value={username}
              onChangeText={setUsername}
            />
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={true}
            />
            <TouchableOpacity style={styles.submitButton} onPress={handleSignIn}>
              <Text style={styles.submitButtonText}>Sign In</Text>
            </TouchableOpacity>
        </View>
      </View>
    </View>
    )
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: width > 768 ? 'row' : 'column',
    padding: 20,
    backgroundColor: "#FFF",
  },

  imageWrapper: {
    width: '100%',
    alignItems: 'center',
  },

  logo: {
    width: width * 0.5,
    height: height * 0.5, 
    resizeMode:'contain',
    alignSelf: "center",
    ...Platform.select({
      android:{
        width: width * 0.6,
        height: height * 0.5,
      }
    })
  },

  rightContainer: { 
    flex: 1, 
    padding: 60, 
    justifyContent: "center" 
  },

  leftContainer: { 
    flex: 1, 
    padding: 60,
    justifyContent: "center"
  },

  formWrapper: {
    width: '100%',
    alignItems: 'center',
  },

  title: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 18,
  },

  label: { 
    color: "#828282", 
    marginVertical: 6 
  },

  input: {
    width: 300,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 20,
    backgroundColor: '#f9f9f9',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        width: "80%",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
      },
      android: {
        elevation: 3,
        width: "80%",
      },
    }),
  },

  submitButton: {
    backgroundColor: "#000",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignItems: "center",
    marginBottom: 20,
  },

  submitButtonText: { 
    color: "#FFF", 
    fontWeight: "500" 
  },

  titleSection: {
    alignItems: "center",
    marginTop: 0,
  },

  inputGroup: {
    alignItems: "center",
    marginBottom: 20,
  },
  
});

export default SignIn;
