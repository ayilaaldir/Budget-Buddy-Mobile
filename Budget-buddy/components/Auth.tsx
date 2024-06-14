import DetailBedgeInput from '@/components/DetailBedgeInput'
import { Colors } from '@/constants/Colors'
import React, { useState } from 'react'
import { Image, Pressable, ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function AuthDisplay({ setIsAuth }: { setIsAuth: (isAuth: boolean) => void }) {
     const [userName, setUserName] = useState<string>('')
     const [email, setEmail] = useState<string>('')
     return (
          <SafeAreaView
               style={{
                    flex: 1,
                    backgroundColor: Colors.dark.background,
               }}
          >
               <ScrollView
                    style={{
                         backgroundColor: Colors.dark.background,
                         flex: 1,
                    }}
               >
                    <View
                         style={{
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                              paddingVertical: 20,
                              paddingHorizontal: 30,
                         }}
                    >
                         <View
                              style={{
                                   width: '70%',
                                   aspectRatio: 1,
                                   backgroundColor: 'white',
                                   borderRadius: 99999,
                              }}
                         />
                         <View
                              style={{
                                   display: 'flex',
                                   flexDirection: 'column',
                                   alignItems: 'center',
                                   marginTop: 40,
                                   gap: 10
                              }}
                         >
                              <DetailBedgeInput label="Username"
                                   onChange={(text) => setUserName(text)}
                                   value={userName}
                              />
                              <DetailBedgeInput label="Email"
                                   onChange={(text) => setEmail(text)}
                                   value={email}
                              />
                              <Pressable
                                   onPress={() => setIsAuth(false)}
                              >
                                   <View
                                        style={{
                                             display: 'flex',
                                             backgroundColor: "#C3C3C3",
                                             minWidth: '100%',
                                             paddingVertical: 10,
                                             borderRadius: 999,
                                             alignItems: "center",
                                             marginTop: 10,
                                        }}
                                   >
                                        <Text style={{ color: "#646464" }}>Log Out</Text>
                                   </View>
                              </Pressable>
                         </View>
                    </View>
                    <View
                         style={{
                              display: 'flex',
                              marginTop: 30,
                              justifyContent: 'center',
                              alignItems: 'center',
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
                    </View>
               </ScrollView>
          </SafeAreaView>
     )
}
