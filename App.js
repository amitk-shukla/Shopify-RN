//import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from './src/scenes/LoginScreen';
import RegisterScreen from './src/scenes/RegisterScreen';
import CategoryScreen from './src/scenes/CategoryScreen';
import MerchantScreen from './src/scenes/MerchantListScreen';
import COLORS from './src/common/Colors';

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          options={{headerShown: false}}
          name="Login"
          component={LoginScreen}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="Registration"
          component={RegisterScreen}
        />
        <Stack.Screen
          options={{
            title: 'CATEGORY',
            headerLeft: null,
            headerStyle: {
              backgroundColor: COLORS.PRIMARY,
            },
            headerTintColor: COLORS.WHITE,
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
          name="Category"
          component={CategoryScreen}
        />
        <Stack.Screen
          options={{
            title: 'MERCHANTS',
            headerStyle: {
              backgroundColor: COLORS.PRIMARY,
            },
            headerTintColor: COLORS.WHITE,
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
          name="Merchant"
          component={MerchantScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
