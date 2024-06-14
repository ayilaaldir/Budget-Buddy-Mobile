import { formatNumber } from '@/app/utils/formatter'
import React from 'react'
import { Text, TextInput, View } from 'react-native'

type DetailBedgeInputProps = {
     label: string
     value: string
     onChange: (value: string) => void
     placeholder?: string
}

export default function DetailBedgeInput({ label, value, onChange, placeholder }: DetailBedgeInputProps) {
     return (
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
                    {label}
               </Text>
               <TextInput
                    value={value}
                    onChange={(e) => onChange(e.nativeEvent.text)}
                    placeholder={placeholder || '-----'}
               />
          </View>
     )
}
