import React, { useState,Dispatch,SetStateAction} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Image, Pressable, Text, TextInput, View, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';

interface LoginProps {
     setIsAuth: (isAuth: boolean) => void;
     setUsername: (username: string | null) => void;
   }
   
   const LoginDisplay: React.FC<LoginProps> = ({ setIsAuth, setUsername: setGlobalUsername }) => {
     const [username, setUsername] = useState('');
     const [password, setPassword] = useState(''); 
     
     const handleSignUp = async () => {
          try {
              const response = await fetch('http://141.147.151.192:8080/register_user.php', {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/x-www-form-urlencoded',
                  },
                  body: `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`,
              });
  
              const data = await response.json();
              if (response.ok && data.status === "success") {
                  Alert.alert("Success", data.message);
                  setIsAuth(true);
                  await handleLogin();
              } else {
                  throw new Error(data.message || "Unable to register");
              }
          } catch (error) {
              Alert.alert("Registration Error", error.message);
          }
      };
      
     const handleLogin = async () => {
      try {
          const response = await fetch('http://141.147.151.192:8080/login.php', {
               method: 'POST',
               headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
               },
               body: `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`,
          })
 
          const data = await response.json();
          if (response.ok && data.status === "success") {
              setIsAuth(true);
              await AsyncStorage.setItem('userID', String(data.user_id));
              await AsyncStorage.setItem('username', data.username);
          } else {
              throw new Error(data.message || "Unable to login");
          }
      } catch (error) {
          Alert.alert("Login Error", error.message);
      }
  };
     const styles = {
         container: {
             flex: 1,
             backgroundColor: Colors.dark.background,
             paddingHorizontal: 30,
             alignItems: 'center',
             justifyContent: 'center',
         },
         image: {
             width: 70,
             height: 70,
         },
         imageText: {
             height: 70,
             resizeMode: 'contain',
         },
         input: {
             minWidth: '100%',
             marginBottom: 10,
             paddingHorizontal: 10,
             paddingVertical: 8,
             borderRadius: 4,
             backgroundColor: 'white',
         },
         button: {
             backgroundColor: "white",
             minWidth: '100%',
             paddingVertical: 10,
             borderRadius: 999,
             alignItems: "center",
             marginTop: 10,
         },
         buttonText: {
             color: "#646464",
         }
     };
 
     return (
         <SafeAreaView style={styles.container}>
             <Image
                 source={require('@/assets/images/logo.png')}
                 style={styles.image}
             />
             <Image
                 source={require('@/assets/images/logo-text.png')}
                 style={styles.imageText}
             />
             <TextInput
                 placeholder="Username"
                 value={username}
                 onChangeText={setUsername}
                 style={styles.input}
                 autoCapitalize="none"
             />
             <TextInput
                 placeholder="Password"
                 value={password}
                 onChangeText={setPassword}
                 style={styles.input}
                 secureTextEntry
                 autoCapitalize="none"
             />
             <Pressable onPress={handleLogin} style={styles.button}>
                 <Text style={styles.buttonText}>Log in</Text>
             </Pressable>
             <Pressable onPress={handleSignUp} style={styles.button}>
                 <Text style={styles.buttonText}>Sign Up</Text>
             </Pressable>
         </SafeAreaView>
     );
   }

   export default LoginDisplay;


