import React, { useState } from 'react';
import { Image, View, StyleSheet, Text, TextInput, TouchableOpacity, Dimensions, Platform, Alert } from 'react-native';

const { width, height } = Dimensions.get('window');

function SignUp() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = () => {
    fetch('http://141.147.151.192:8080/register_user.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`,
    })
      .then(response => response.json())
      .then(data => {
        if (data.status === 'success') {
          Alert.alert('Success', data.message);
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
    <View style={styles.container}>
        <Image
          source={require('@/assets/images/mobile.png')}
          style={{
            height: 200,
            objectFit: 'contain',
            marginBottom: 30,
       }}
        />
      <View style={styles.formWrapper}>
        <Text style={styles.title}>Sign in to your account</Text>
        <Text style={styles.title2}>Enter your account</Text>
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
        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <View style={styles.orContainer}>
          <View style={styles.line} />
          <Text style={styles.orText}>or</Text>
          <View style={styles.line} />
        </View>
        <TouchableOpacity style={styles.buttonwith} onPress={handleSignUp}>
          <Text style={styles.buttonTextwith}>Use without account</Text>
        </TouchableOpacity>
        <Text style={styles.accountText}>
          Don't have an account? <Text style={styles.signUpText}>Sign Up</Text>
        </Text>

        <Text style={styles.agreementText}>
          By clicking continue, you agree to our{' '}
          <Text style={styles.linkText}>Terms of Service</Text> and{' '}
          <Text style={styles.linkText}>Privacy Policy</Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  formWrapper: {
    width: '100%',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    width: '80%',
    fontSize: 16,
    marginVertical: 5,
    textAlign: 'left',
  },
  input: {
    width: '80%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 20,
    backgroundColor: '#f9f9f9',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  button: {
    width: '80%',
    padding: 15,
    backgroundColor: '#000',
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },

  buttonwith: {
    width: '80%',
    padding: 15,
    backgroundColor: '#CBD5E0',
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonTextwith: {
    color: '#000',
    fontSize: 16,
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    width: '80%',
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#CBD5E0',
  },
  orText: {
    marginHorizontal: 10,
    color: '#CBD5E0',
  },
  accountText: {
    textAlign: 'center',
    color: '#666',
    marginTop: 20,
  },
  signUpText: {
    color: '#007BFF',
  },
  agreementText: {
    textAlign: 'center',
    color: '#666',
    marginTop: 20,
    paddingHorizontal: 20,
  },
  linkText: {
    color: '#007BFF',
  },
  title2: {
    fontSize: 15,
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default SignUp;
