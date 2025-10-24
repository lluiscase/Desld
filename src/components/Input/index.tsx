import React from 'react';
import { View, TextInput } from 'react-native';

interface InputProps {
    placeholder?: string;
}

export function Input(props: InputProps) {
  return (
    <View>
        <TextInput className="bg-black p-4" placeholder='Digite sua senha'/>
    </View>
  );
}