import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';
import { StatusBar } from 'react-native';
import { Center, NativeBaseProvider } from 'native-base';
import {  Text } from 'react-native';
import { THEME } from './src/theme';


export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });
  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      {
        fontsLoaded ?
        <Center flex={1}>
          <Text>Open up App.js to start working on your app!</Text>
        </Center>
          : <></>
      }
    </NativeBaseProvider>
  );
}
