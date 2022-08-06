import React from 'react';
import {NativeBaseProvider} from 'native-base';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ApiProvider} from '@reduxjs/toolkit/dist/query/react';

import HomePage from './src';
import DialogForm from './src/DialogForm';
import {ContactApi} from './src/redux/store';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <ApiProvider api={ContactApi}>
      <NativeBaseProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              options={{headerShown: false}}
              name="Home"
              component={HomePage}
            />
            <Stack.Screen
              options={{title: "Add New Contact"}}
              name="FormContact"
              component={DialogForm}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    </ApiProvider>
  );
};

export default App;
