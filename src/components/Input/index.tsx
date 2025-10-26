import { useState, useRef, useCallback} from 'react';
import { TextInput, TouchableOpacity, KeyboardType } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

type InputType = 'email' | 'password' | 'name';

interface InputProps {
  inputType: InputType;
}

const INPUT_CONFIG: Record<InputType, { icon: string; placeholder: string; keyboardType: KeyboardType }> = {
  name: { 
    icon: 'person', 
    placeholder: 'Seu Nome Completo',
    keyboardType: 'default',
  },
  email: { 
    icon: 'mail', 
    placeholder: 'Digite seu Email:',
    keyboardType: 'email-address',
  },
  password: {
    icon: 'lock', 
    placeholder: 'Crie sua senha:',
    keyboardType: 'default',
  },
};

export function Input({inputType}: InputProps) {

  const [text, setText] = useState('');
  const inputRef = useRef<TextInput>(null);
  
  const handlePress = useCallback(() => {
    inputRef.current?.focus(); 
  }, []);

  const isPassword = inputType === 'password';
  const config = INPUT_CONFIG[inputType];

  return (
    <TouchableOpacity 
      onPress={handlePress}
      activeOpacity={0.8}
      className="flex-row items-center p-4 w-[376px] h-[60px] rounded border border-gray-500"
    >
      <MaterialIcons 
        name={config.icon} 
        size={34} 
        color="#767676"
        className="mr-3"
      />

      <TextInput 
        ref={inputRef}        
        className="flex-1 border-none focus:outline-none"
        placeholder={config.placeholder}
        placeholderTextColor="#A0A0A0"
        value={text}
        onChangeText={setText}
        underlineColorAndroid="transparent"

        secureTextEntry={isPassword} 
        keyboardType={config.keyboardType}

        autoCapitalize={inputType === 'name' ? 'words' : 'none'}
      />
    </TouchableOpacity>
  );
}