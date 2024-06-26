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
          </SafeAreaView>
     )
}
