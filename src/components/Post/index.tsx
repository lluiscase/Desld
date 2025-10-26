import { View, Text, Image } from 'react-native';
import imgDog from '../../../assets/dog-convertido-de-jpg.png'

type PostSituation = 'Perdido' | 'Abandonado' | 'Adocao';

interface PostProps{
	name?:string; 
	type:string;
	situation:PostSituation;
	time:number;
}


export function Post({name, type, situation, time}:PostProps) {

	let backgroundColorSituation = "bg-red"

	if(name === undefined || name === null || name === ''){
		name = 'Sem nome'
	}
	if(situation === 'Abandonado'){
		backgroundColorSituation = "bg-yellow"
	}
	if(situation === 'Adocao'){
		backgroundColorSituation = "bg-green"
	}

  return (
	<View className='flex flex-row p-2 rounded-lg bg-gray-300 w-full'>
		<Image source={imgDog} style={{ width: 105, height: 91, borderRadius: 5 }}/>
		<View className='flex-1'>
			<View className='flex flex-row justify-between pl-2 pb-3'>
				<Text className='uppercase font-bold text-xl'>{name}</Text>
				<Text className={`${backgroundColorSituation} flex justify-center text-lg items-center px-2 rounded-3xl`}>{situation}</Text>
			</View>
			<Text className={`bg-blue-200 text-gray-500 ml-2 flex justify-center items-center rounded-3xl w-20`}>{type}</Text>
			<Text className='flex justify-end mt-2'>Há {time} dias</Text>
		</View>
	</View>
  );
}