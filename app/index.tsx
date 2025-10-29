import { StatusBar } from 'expo-status-bar';
import { ScrollView, View } from 'react-native';
import { Input } from '../src/components/Input';
import "../src/styles/global.css";
import { Button } from '../src/components/Button';
import { Navigation } from '../src/components/Navigation';
import { Post } from '../src/components/Post';
import { Link } from 'expo-router';
import { TextArea } from '../src/components/TextArea';

export default function Home() {

  return (
    <ScrollView className='py-4'>  
      <View className='flex-1 gap-4 px-8 bg-white items-center'>
        <Input inputType='email'/>
        <Input inputType='name'/>
        <Input inputType='password'/>
        <Button text='Próximo'/>
        <TextArea/>
        <Post situation='Perdido' time={5} type='Cachorro'/>
        <Post name='rex' situation='Abandonado' time={4} type='Cachorro'/>
        <Post name='rex' situation='Adocao' time={4} type='Cachorro'/>
        <Link href={'/login'}>dadsa</Link>
        <Navigation/>
        <StatusBar style="auto" />
      </View>
    </ScrollView>
  );
}

