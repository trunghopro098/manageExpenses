import React from 'react';
import { StatusBar } from 'react-native';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';;
import Splash from './src/screens/splash';
import Home from './src/screens/Home';
import Tutorial from './src/screens/tutorial';
import SpendDetail from './src/screens/spendDetail';
import Historyspend from './src/screens/historyspend';



const Tab = createStackNavigator();

const App = () =>{

  return (
    <NavigationContainer>
        <StatusBar 
            backgroundColor="white"
            barStyle="dark-content"
        />
      <Tab.Navigator
        initialRouteName='splash'
        screenOptions={{ headerShown:false}}
      >
        <Tab.Screen name='splash' component={Splash}/>
        <Tab.Screen name='home' component={Home}/>
        <Tab.Screen name='tutorial' component={Tutorial}/>
        <Tab.Screen name='detail' component={SpendDetail} options={{headerShown:true,headerTitle:"Daily personal expense"}}/>
        <Tab.Screen name='history' component={Historyspend} options={{headerShown:true,headerTitle:"Personal expense history"}}/>
      </Tab.Navigator>
    </NavigationContainer>
  );
};


export default App;
