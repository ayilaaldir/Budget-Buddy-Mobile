import FinancialActivityComponent from '@/components/statistics/financial-activity'
import { Colors } from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import React, { useState } from 'react'
import { Pressable, ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'


export default function StatisticScreen() {
     return (
          <SafeAreaView
               style={{
                    flex: 1,
                    backgroundColor: Colors.dark.background,
               }}
          >
               <View
                    style={{
                         width: '100%',
                         paddingVertical: 20,
                         paddingHorizontal: 20,
                         backgroundColor: Colors.light.background,
                         borderBottomWidth: 0.5,
                         borderBottomColor: '#4A4A4A',
                    }}
               >
                    <Text> Financial Activity </Text>
               </View>
               <View
                    style={{
                         display: 'flex',
                         flexDirection: 'row',
                    }}
               >
               </View>
               <ScrollView
                    style={{
                         backgroundColor: Colors.dark.background,
                         flex: 1,
                    }}
               >
                    <FinancialActivityComponent/>
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
