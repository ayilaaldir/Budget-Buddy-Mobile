import LoginDisplay from '@/components/auth/login';
import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
        setShowSignUp(false); // Ensuring the SignUp form is not shown after sign out
    };

    // Simplified rendering logic
    if (!isAuth) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <LoginDisplay setIsAuth={setIsAuth} setUsername={setUsername} />
            </View>
        );
    }

    // Display for logged-in users
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Welcome, {username}! Your user ID is {userID}.</Text>
            <Button title="Sign Out" onPress={handleSignOut} />
        </View>
    );
}
