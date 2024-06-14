import { Colors } from "@/constants/Colors";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

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
                    <Text> {"<"} May 2024 {">"} </Text>
               </View>
          </SafeAreaView>
     )
}