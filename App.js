import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home, Checkout } from './views';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <stripeProvider publishableKey="pk_test_51PwBMAP7c5dIX7h787ZxHZkpcKTWUSsGPUm9IlCjOz1T5BGO05HrIgoO7DRB6ZzDfjMUCJp09S6q6PuJdfM1HXeR00tSR8eIZV">
      <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={{headerShown: false}} />
        <Stack.Screen name="Checkout" component={Checkout} options={{headerShown: false}} />
      </Stack.Navigator>
    </NavigationContainer>
    </stripeProvider>
  );
};