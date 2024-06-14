import DetailBedgeInput from '@/components/DetailBedgeInput'
import { Colors } from '@/constants/Colors'
import React, { useState } from 'react'
import { Image, Pressable, ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function LoginDisplay({ setIsAuth }: { setIsAuth: (isAuth: boolean) => void }) {
     return (
          <SafeAreaView
               style={{
                    flex: 1,
                    backgroundColor: Colors.dark.background,
               }}
          >
               <View
                    style={{
                         flex: 1,
                         paddingHorizontal: 30,
                         alignItems: 'center',
                         justifyContent: 'center',
                    }}
               >
                    <Image
                         source={require('@/assets/images/logo.png')}
                         style={{
                              width: 70,
                              height: 70,
                         }}
                    />
                    <Image
                         source={require('@/assets/images/logo-text.png')}
                         style={{
                              height: 70,
                              objectFit: 'contain',
                         }}
                    />
                    <Pressable
                         onPress={() => setIsAuth(true)}
                    >
                         <View
                              style={{
                                   display: 'flex',
                                   backgroundColor: "white",
                                   minWidth: '100%',
                                   paddingVertical: 10,
                                   borderRadius: 999,
                                   alignItems: "center",
                                   marginTop: 10,
                              }}
                         >
                              <Text style={{ color: "#646464" }}>Log in or Sign up</Text>
                         </View>
                    </Pressable>
               </View>
          </SafeAreaView>
     )
}
