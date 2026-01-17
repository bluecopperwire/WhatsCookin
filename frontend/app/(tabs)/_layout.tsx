import { ImageBackground, Image, View, Text } from 'react-native'
import { icons } from '@/constants/icons'
import { Tabs } from 'expo-router'

import React from 'react'

const TabIcon = ({focused, icon, title}: any) => {
  return (
    <Image source={icon} style={{ width: 30, height: 30 }} resizeMode="contain"/>
  )
}

const _layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarItemStyle:{
          width: "100%",
          height: "100%",
          justifyContent: "center",
        },
        tabBarStyle: {
          backgroundColor: "#EE6D06",
          borderRadius: 33,
          marginHorizontal: 55,
          marginBottom: 40,
          width: 280,
          height: 52,
          paddingTop: 10,
          overflow: "hidden",
          position: "absolute",
          
        }
      }}

    >
        <Tabs.Screen
          name="home"
          options={{
            headerShown: false,
            tabBarIcon: ({focused}) => (
              <TabIcon focused={focused} icon={icons.Home}/>
            )
          }}
        />
        <Tabs.Screen
          name="scan"
          options={{
            headerShown: false,
            tabBarIcon: ({focused}) => (
              <TabIcon focused={focused} icon={icons.Scan}/>
            )
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            headerShown: false,
            tabBarIcon: ({focused}) => (
              <TabIcon focused={focused} icon={icons.Profile}/>
            )
          }}
        />
        <Tabs.Screen
          name="(filters)"
          options={{
            headerShown: false,
            tabBarItemStyle: { display: "none" },
          }}
        />
        <Tabs.Screen
          name="scanFinish"
          options={{
            headerShown: false,
            tabBarItemStyle: { display: "none" },
          }}
        />
        <Tabs.Screen
          name="recipe/[id]"
          options={{
            headerShown: false,
            tabBarItemStyle: { display: "none" },
          }}
        />
        <Tabs.Screen
          name="review/[id]"
          options={{
            headerShown: false,
            tabBarItemStyle: { display: "none" },
          }}
        />
        <Tabs.Screen
          name="leaveReview/[id]"
<<<<<<< HEAD
          options={{
            headerShown: false,
            tabBarItemStyle: { display: "none" },
          }}
        />
        <Tabs.Screen
          name="favorite"
=======
>>>>>>> origin/frontend3
          options={{
            headerShown: false,
            tabBarItemStyle: { display: "none" },
          }}
        />
        <Tabs.Screen
          name="addRecipe"
          options={{
            headerShown: false,
            tabBarItemStyle: { display: "none" },
          }}
        />
        
    </Tabs>
    
  )
}

export default _layout