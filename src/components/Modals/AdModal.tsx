import type React from "react";
import {
  Dimensions,
  Modal,
  type ModalProps,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");
interface AdConfirmationModalProps extends ModalProps {
  isVisible: boolean;
  onContinue: () => void;
  onClose: () => void;
}

const AdConfirmationModalTailwind: React.FC<AdConfirmationModalProps> = ({
  isVisible,
  onContinue,
  onClose,
  ...rest
}) => {
  return (
    <Modal
      visible={isVisible}
      animationType="fade"
      transparent={true}
      onRequestClose={onClose}
      {...rest}
    >
      <View className={"flex-1 justify-center items-center bg-black/70"}>
        <View
          className={
            "relative w-11/12 max-w-sm bg-white rounded-xl p-8 items-center"
          }
        >
          <TouchableOpacity
            onPress={onClose}
            className={"absolute top-[0px] right-1 p-2 z-10"}
          >

            <Text className={"text-xl font-bold text-gray-500"}>X</Text>
          </TouchableOpacity>

          <View
            className={
              "w-full h-48 bg-gray-300 justify-center items-center rounded-lg mb-7"}
          >
            <Text className={"text-base font-bold text-gray-600"}>AD</Text>
          </View>

          <Text className={"text-lg font-bold text-black text-center mb-2"}>
            Anuncio divulgado com sucesso!
          </Text>

          <Text
            className={
              "text-sm text-gray-600 text-center leading-5 px-2 mb-8"
            }
          >
            Sua atitude generosa e atenciosa pode fazer toda a diferença!
          </Text>
          <TouchableOpacity
            className={"w-full bg-blue-500 py-3 rounded-lg items-center"}
            onPress={onContinue}
          >
            <Text className={"text-base font-bold text-white"}>
              Continuar
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default AdConfirmationModalTailwind;
