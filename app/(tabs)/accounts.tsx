import DetailBedge from '@/components/DetailBedge'
import DetailBedgeText from '@/components/DetailBedgeText'
import { Colors } from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import React, { useState } from 'react'
import { Pressable, ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function AccountsScreen() {
     const [type, setType] = useState<string>('income')
     return (
          <SafeAreaView
               style={{
                    flex: 1,
                    backgroundColor: Colors.dark.background,
               }}
          >
               <View
                    style={{
                         display: 'flex',
                         flexDirection: 'row',
                    }}
               >
                    <View
                         style={{
                              flex: 1,
                              paddingVertical: 20,
                              backgroundColor: 'white',
                              alignItems: 'center',
                         }}
                    >
                         <View
                              style={{
                                   display: 'flex',
                                   flexDirection: 'column',
                                   alignItems: 'center',
                              }}
                         >
                              <Text>Asstest</Text>
                              <Text>-------</Text>
                         </View>
                    </View>
                    <View
                         style={{
                              flex: 1,
                              paddingVertical: 20,
                              backgroundColor: 'white',
                              alignItems: 'center',
                         }}
                    >
                         <View
                              style={{
                                   display: 'flex',
                                   flexDirection: 'column',
                                   alignItems: 'center',
                              }}
                         >
                              <Text>Liabilities</Text>
                              <Text>-------</Text>
                         </View>
                    </View>
                    <View
                         style={{
                              flex: 1,
                              paddingVertical: 20,
                              backgroundColor: 'white',
                              alignItems: 'center',
                         }}
                    >
                         <View
                              style={{
                                   display: 'flex',
                                   flexDirection: 'column',
                                   alignItems: 'center',
                              }}
                         >
                              <Text>Total</Text>
                              <Text>-------</Text>
                         </View>
                    </View>
               </View>
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
                                   display: 'flex',
                                   flexDirection: 'column',
                                   alignItems: 'center',
                                   marginTop: 20,
                                   gap: 15
                              }}
                         >
                              <DetailBedgeText title="Accounts" value={''} />
                              <DetailBedge title="Cash" value={0} />
                              <View
                                   style={{
                                        display: "flex",
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                        alignItems: 'center',
                                        width: "100%",
                                        backgroundColor: 'white',
                                        paddingVertical: 8,
                                        paddingHorizontal: 20,
                                        borderRadius: 999,
                                   }}
                              >
                                   <Text style={{ fontSize: 12 }}>
                                        Card
                                   </Text>
                                   <View
                                        style={{
                                             display: 'flex',
                                             flexDirection: 'column',
                                             alignItems: 'center',
                                        }}
                                   >
                                        <Text style={{ fontSize: 12 }}>Balance Payable</Text>
                                        <Text>-----</Text>
                                   </View>
                                   <View
                                        style={{
                                             display: 'flex',
                                             flexDirection: 'column',
                                             alignItems: 'center',
                                        }}
                                   >
                                        <Text style={{ fontSize: 12 }}>Balance Payable</Text>
                                        <Text>-----</Text>
                                   </View>
                              </View>

                         </View>
                    </View>
               </ScrollView>
               <Pressable>
                    <View
                         style={{
                              backgroundColor: "white",
                              width: 60,
                              height: 60,
                              borderRadius: 999,
                              position: 'absolute',
                              bottom: 20,
                              right: 20,
                              shadowColor: "#000",
                              shadowOffset: {
                                   width: 0,
                                   height: 2,
                              },
                              shadowOpacity: 0.25,
                              shadowRadius: 3.84,

                              elevation: 5,
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                         }}
                    >
                         <Ionicons name="add" size={50} color={Colors.light.blueButton} />
                    </View>
               </Pressable>
          </SafeAreaView>
     )
}
