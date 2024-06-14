import { Tabs } from 'expo-router';
import React from 'react';
import { View, Pressable } from 'react-native';
import { Colors } from '@/constants/Colors';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';

type IconName = 'book-outline' | 'bar-chart-outline' | 'wallet-outline' | 'person-outline';

type TabConfigurations = {
  [key: string]: {
    order: number;
    icon: IconName;
    label: string;
  };
};

const tabConfigurations: TabConfigurations = {
  index: {
    order: 1,
    icon: 'book-outline',
    label: 'Index',
  },
  statistic: {
    order: 2,
    icon: 'bar-chart-outline',
    label: 'Statistic',
  },
  accounts: {
    order: 3,
    icon: 'wallet-outline',
    label: 'Accounts',
  },
  profile: {
    order: 4,
    icon: 'person-outline',
    label: 'Profile',
  },
};

export default function TabLayout() {
  return (
    <Tabs
      tabBar={({ state, navigation }) => (
        <View
          style={{
            backgroundColor: Colors.dark.background,
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}
        >
          {state.routes.sort((a, b) => {
            return tabConfigurations[a.name].order - tabConfigurations[b.name].order;
          }).map((route, index) => {
            const isFocused = state.index === index;
            const { icon } = tabConfigurations[route.name];
            return (
              <Pressable
                key={route.key}
                onPress={() => navigation.navigate(route.name)}
                style={{
                  flex: 1,
                  alignItems: 'center',
                  backgroundColor: isFocused ? Colors.light.background : 'white',
                }}
              >
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingVertical: 25,
                  }}
                >
                  <TabBarIcon name={icon} size={25} />
                </View>
              </Pressable>
            );
          })}
        </View>
      )}
      screenOptions={{
        headerShown: false,
      }}
    >
    </Tabs>
  );
}
