import { useNavigation } from "@react-navigation/native";
import { Image, Text, TouchableOpacity, View } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import CatsWelcome from "../../assets/catsWelcome.png";
import Button from "../../src/components/Button";
import Input from "../../src/components/Input";
import { useAuth } from "../../src/context/authContext";

export default function Register() {
	const navigation = useNavigation();
  const { signIn } = useAuth();

  const handleLogin = async () => {
		await signIn("some_auth_token_from_server");
	};

	const handleGoBack = () => {
		navigation.goBack();
	};

	return (
    <View className="flex-1 flex flex-col bg-blue-400">
      <View className="flex flex-col justify-end p-8 h-[174px]">
        <View className="flex flex-row items-center">
          <TouchableOpacity className="mr-3" onPress={handleGoBack}>
            <MaterialIcons name={"arrow-back"} size={25} color="#fff" />
          </TouchableOpacity>
          <Text className="text-white text-4xl font-bold">
            Criar conta
          </Text>
        </View>
      </View>
      <View className="flex-1 flex flex-col justify-between items-center bg-white p-8 rounded-t-3xl">
        <Image source={CatsWelcome} />
        <View className="w-full">
          <Input inputType="name" showLabel />
          <Input inputType="email" showLabel />
          <Input inputType="password" showLabel />
          <Input inputType="passwordRerun" showLabel />
        </View>
        <Button text="Criar conta" onPress={handleLogin} />
      </View>
    </View>
	);
}
