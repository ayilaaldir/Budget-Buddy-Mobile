import React from 'react'
import { View } from 'react-native'
import DetailBedge from './DetailBedge'

export default function Income() {
     return (
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
                    <DetailBedge title="Other" value={100000} />
                    <DetailBedge title="Allowance" value={250000} />
                    <DetailBedge title="Salary" value={355000} />

               </View>
          </View>
     )
}
