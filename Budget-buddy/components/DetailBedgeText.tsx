import { formatNumber } from '@/app/utils/formatter'
import React from 'react'
import { Text, View } from 'react-native'

type DetailBedgeTextProps = {
     title: string
     value: string
}

export default function DetailBedgeText({ title, value }: DetailBedgeTextProps) {
     return (
          <View
               style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "100%",
                    backgroundColor: 'white',
                    paddingVertical: 8,
                    paddingHorizontal: 20,
                    borderRadius: 999,
               }}
          >
               <Text style={{ fontSize: 12 }}>
                    {title}
               </Text>
               <Text style={{ fontSize: 12 }}>
                    {value || '-----'}
               </Text>
          </View>
     )
}
