import { useState } from 'react';
import { TextInput} from 'react-native';

export default function TextArea() {
  const [text, onChangeText] = useState('');

  return (
    <TextInput
    className="w-full h-32 p-4 border border-gray-300 rounded-md bg-white text-base text-black"
    onChangeText={onChangeText}
    value={text}
    placeholder="Your text here..."

    multiline={true}
    numberOfLines={5}
    textAlignVertical="top"
    />
  );
}
