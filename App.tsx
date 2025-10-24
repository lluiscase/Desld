import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import Teste from './assets/favicon.png';
import { useState } from 'react';
import { Input } from './src/components/Input';
import "./src/styles/global.css";

export default function App() {

  const [count, setCount] = useState(0);

  const handleTeste = () => {
    setCount(count + 1);
    console.log('Clicou', count + 1);
  }

  return (
    <View style={styles.container}>
      <Text>Hello World!</Text>
      <Input/>
      <TouchableOpacity onPress={handleTeste}>
        <Image source={Teste} />
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
