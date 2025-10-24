import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import Teste from './assets/favicon.png';
import { useState } from 'react';
import { Input } from './src/components/Input';
import "./src/styles/global.css";
import { Button } from './src/components/Button';

export default function App() {

  return (
    <View style={styles.container}>
      <Input inputType='email'/>
      <Button text='Próximo'/>
      <Input inputType='name'/>
      <Button text='Próximo'/>
      <Input inputType='password'/>

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
