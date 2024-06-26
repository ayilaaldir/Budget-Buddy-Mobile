import React, { useState,Dispatch,SetStateAction } from 'react';
import { Image, Pressable, Text, TextInput, View, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '@/constants/Colors';
import LoginDisplay from './login';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface SignUpProps {
     setIsAuth: Dispatch<SetStateAction<boolean>>;
     setUserId: Dispatch<SetStateAction<number | null>>;
     setUsername: Dispatch<SetStateAction<string | null>>;
     setShowSignUp: Dispatch<SetStateAction<boolean>>;
   }


export default function SignUpDisplay({ setIsAuth }: { setIsAuth: (isAuth: boolean) => void }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showLogin, setShowLogin] = useState(false);

    if (showLogin) {
     return <SignUpDisplay setIsAuth={setIsAuth} />;
     }
    const handleSignUp = async () => {
        try {
            const response = await fetch('API_SIGN_UP_ENDPOINT', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();
            if (response.ok && data.status === "success") {
                Alert.alert("Success", data.message);
                setIsAuth(true); 
            } else {
                throw new Error(data.message || "Unable to register");
            }
        } catch (error) {
            Alert.alert("Registration Error", error.message);
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
            <Pressable onPress={handleSignUp} style={styles.button}>
                <Text style={styles.buttonText}>Sign Up</Text>
            </Pressable>
            <Pressable onPress={() => setShowLogin(true)} style={styles.button}>
                 <Text style={styles.buttonText}>Back To Login</Text>
             </Pressable>
        </SafeAreaView>
    );
}
