import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Import screens (we'll create these next)
import HomeScreen from '../screens/HomeScreen';
import ProgramScreen from '../screens/ProgramScreen';
import ProfileScreen from '../screens/ProfileScreen';
import DailyTasksScreen from '../screens/DailyTasksScreen';
import WeeklyProgramScreen from '../screens/WeeklyProgramScreen';
import NutritionScreen from '../screens/NutritionScreen';
import TechniquesScreen from '../screens/TechniquesScreen';
import ProgressScreen from '../screens/ProgressScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const ProgramStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="ProgramMain" 
        component={ProgramScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="DailyTasks" 
        component={DailyTasksScreen}
        options={{ title: 'Daily Protocol' }}
      />
      <Stack.Screen 
        name="WeeklyProgram" 
        component={WeeklyProgramScreen}
        options={{ title: 'Weekly Program' }}
      />
      <Stack.Screen 
        name="Nutrition" 
        component={NutritionScreen}
        options={{ title: 'Nutrition Plan' }}
      />
      <Stack.Screen 
        name="Techniques" 
        component={TechniquesScreen}
        options={{ title: 'Growth Techniques' }}
      />
      <Stack.Screen 
        name="Progress" 
        component={ProgressScreen}
        options={{ title: 'Progress Tracking' }}
      />
    </Stack.Navigator>
  );
};

const AppNavigator = () => {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === 'Home') {
                iconName = 'home';
              } else if (route.name === 'Program') {
                iconName = 'fitness-center';
              } else if (route.name === 'Profile') {
                iconName = 'person';
              }

              return <Icon name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#6200ee',
            tabBarInactiveTintColor: 'gray',
          })}
        >
          <Tab.Screen 
            name="Home" 
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Tab.Screen 
            name="Program" 
            component={ProgramStack}
            options={{ headerShown: false }}
          />
          <Tab.Screen 
            name="Profile" 
            component={ProfileScreen}
            options={{ headerShown: false }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default AppNavigator; 