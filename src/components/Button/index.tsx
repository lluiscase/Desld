import { TouchableOpacity, Text } from 'react-native';

interface ButtonProps {
    text: string;
}

export function Button({text}: ButtonProps) {
  return (
    <TouchableOpacity 
      className='bg-blue-400 p-4 w-[376px] h-[56px] rounded items-center justify-center'
    >
      <Text className='text-white font-bold text-lg'>
        {text}
      </Text>
    </TouchableOpacity>
  );
}