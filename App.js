import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import { Colors } from './constants/styles';
import AuthContentProvider, { AuthContext } from './store/auth-context';
import { useContext, useEffect, useState } from 'react';
import IconButton from "./components/ui/IconButton";
import AppLoading from 'expo-app-loading';


const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}

function AuthenticatedStack() {
  const authCtx = useContext(AuthContext);
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary500 },
        headerTintColor: 'white',
        contentStyle: { backgroundColor: Colors.primary100 },
      }}
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} options={{
        headerRight: ({ tintColor }) => <IconButton icon="exit" color={tintColor} size={24} onPress={() => {
          authCtx.logout()
        }} />
      }} />
    </Stack.Navigator>
  );
}

function Navigation() {
  const authCtx = useContext(AuthContext);

  return (


    <NavigationContainer>
      {!authCtx.isAuthenticated && <AuthStack />}
      {authCtx.isAuthenticated && <AuthenticatedStack />}
    </NavigationContainer>

  );
}

function Root() {
  const [isTryingLogin, setIsTryingLogin] = useState(true);
  const authCtx = useContext(AuthContext);
  useEffect(() => {
    async function localToken() {

      const storedtoken = await AsyncStorage.getItem("token");

      if (storedtoken) {
        authCtx.authenticate(storedtoken);
      }
      setIsTryingLogin(false);
    }
    localToken();
  }, [])
  if (isTryingLogin) {
    return <AppLoading />
  }
  return <Navigation />
}

export default function App() {


  return (
    <>
      <StatusBar style="light" />
      <AuthContentProvider>
        <Root />
      </AuthContentProvider>
    </>
  );
}
