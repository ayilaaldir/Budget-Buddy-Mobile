import { Tabs } from 'expo-router';
import React from 'react';
import { View, Pressable } from 'react-native';
import { Colors } from '@/constants/Colors';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import SignIn from './signin';

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
  signin: {
    order: 5,
    icon: 'person-outline',
    label: 'Sign In',
  },
  signup: {
    order: 6,
    icon: 'person-outline',
    label: 'Sign Up',
  },
  addtransactions: {
    order: 7,
    icon: 'person-outline',
    label: 'Add Transaction',
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
            console.log('Checking configurations:', a.name, tabConfigurations[a.name], b.name, tabConfigurations[b.name]);
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
