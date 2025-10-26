import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View} from 'react-native';
import { Input } from '../src/components/Input';
import "../src/styles/global.css";
import { Button } from '../src/components/Button';
import { Navigation } from '../src/components/Navigation';
import { Post } from '../src/components/Post';
import { Link } from 'expo-router';

export default function Home() {

  return (
    <View style={styles.container}>
      <Input inputType='email'/>
      <Button text='Próximo'/>
      <Input inputType='name'/>
      <Button text='Próximo'/>
      <Input inputType='password'/>
      <Post situation='Perdido' time={5} type='Cachorro'/>
      <Post name='rex' situation='Abandonado' time={4} type='Cachorro'/>
      <Post name='rex' situation='Adocao' time={4} type='Cachorro'/>
      <Link href={'/login'}>dadsa</Link>
      <Navigation/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap:8,
    paddingHorizontal:32,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
