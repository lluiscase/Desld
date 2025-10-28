import React, { useState } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export function Navigation() {
  const [select, setSelect] = useState(1)

  const handlePressed = (value:number) =>{
    setSelect(value)
  }

  return (
	<View className='flex flex-row border rounded-3xl border-gray-500 w-full md:w-[376px] h-[70px] justify-evenly items-center'>
		<TouchableOpacity onPress={()=>handlePressed(1)}>
      <MaterialIcons 
        name="home"
        size={34} 
        color={select === 1 ? '#42A5F5' : '#000000'}
      />
    </TouchableOpacity>
    <TouchableOpacity onPress={()=>handlePressed(2)}>
      <MaterialIcons 
        name="add"
        size={34} 
        color={select === 2 ? '#42A5F5' : '#000000'}
      />
    </TouchableOpacity>
    <TouchableOpacity onPress={()=>handlePressed(3)}>
      <MaterialIcons 
        name="search"
        size={34} 
        color={select === 3 ? '#42A5F5' : '#000000'}
      />
    </TouchableOpacity>
	</View>
  );
}