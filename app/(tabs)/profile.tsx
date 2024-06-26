import LoginDisplay from '@/components/auth/login';
import React, { useState, useEffect } from 'react';
import { View, Text, Button, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors } from 'react-native/Libraries/NewAppScreen';

export default function ProfileScreen() {
    const [isAuth, setIsAuth] = useState(false);
    const [userID, setUserId] = useState<number | null>(null);
    const [username, setUsername] = useState<string | null>(null);

    useEffect(() => {
        const checkAuth = async () => {
            const storedUserID = await AsyncStorage.getItem('userID');
            const storedUsername = await AsyncStorage.getItem('username');
            if (storedUserID && storedUsername) {
                setIsAuth(true);
                setUserId(Number(storedUserID))
                setUsername(storedUsername);
                console.log(storedUserID);
            }
        };

        checkAuth();
    }, []);

    const handleSignOut = async () => {
        await AsyncStorage.removeItem('userID');
        await AsyncStorage.removeItem('username');
        setIsAuth(false);
        setUserId(null);
        setUsername(null);
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

    if (!isAuth) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <LoginDisplay setIsAuth={setIsAuth} setUsername={setUsername} />
            </View>
        );
    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
               <Text>Welcome, {username}! Your user ID is {userID}.</Text>
               <Pressable onPress={handleSignOut} style={styles.button}>
                    <Text style={styles.buttonText}>Sign Out</Text>
               </Pressable>
        </View>
    );
}
