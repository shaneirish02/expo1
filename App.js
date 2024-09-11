import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ToDoList from './screens/ToDoList';
import Dashboard from './screens/Dashboard';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ToDoList">
        
        <Stack.Screen name="ToDoList" component={ToDoList} />
        <Stack.Screen name="Dashboard" component={Dashboard}
           options={{
            cardStyle: { backgroundColor: '#118AB2' },
           }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}