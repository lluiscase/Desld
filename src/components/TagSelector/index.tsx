// Garanta que você tenha o nativewind configurado

import { MaterialIcons } from "@expo/vector-icons";
import { useMemo, useState } from "react";
import {
	SafeAreaView,
	ScrollView,
	Text,
	TouchableOpacity,
	View,
} from "react-native";

type TagItem = {
	id: string;
	label: string;
};

const ALL_ITEMS: TagItem[] = [
	{ id: "castrado", label: "Castrado" },
	{ id: "macho", label: "Macho" },
	{ id: "femea", label: "Femea" },
	{ id: "vacinado", label: "Vacinado" },
	{ id: "2-5-anos", label: "2-5 anos" },
	{ id: "0-2-anos", label: "0-2 anos" },
	{ id: "5-10-anos", label: "5-10 anos" },
	{ id: "10-mais-anos", label: "+10 anos" },
	{ id: "coleira", label: "Coleira com identificação" },
	{ id: "agressivo", label: "Agressivo" },
	{ id: "machucado", label: "Machucado" },
	{ id: "grande-porte", label: "Grande porte" },
];

export const TagSelector = () => {
	const [selectedIds, setSelectedIds] = useState<string[]>([]);

	const toggleItem = (item: TagItem) => {
		setSelectedIds((currentIds) => {
			if (currentIds.includes(item.id)) {
				return currentIds.filter((id) => id !== item.id);
			} else {
				return [...currentIds, item.id];
			}
		});
	};

  const clearAll = () => {
    setSelectedIds([]);
  };

	const { selectedItems, availableItems } = useMemo(() => {
		const selected: TagItem[] = [];
		const available: TagItem[] = [];

		ALL_ITEMS.forEach((item) => {
			if (selectedIds.includes(item.id)) {
				selected.push(item);
			} else {
				available.push(item);
			}
		});

		return { selectedItems: selected, availableItems: available };
	}, [selectedIds]);

	const Tag = ({
		item,
		selected = false,
	}: {
		item: TagItem;
		selected?: boolean;
	}) => (
		<TouchableOpacity
			onPress={() => toggleItem(item)}
			className={`
        m-1 rounded-full border border-gray-300 px-3 py-1.5
        ${selected ? "border-cyan-500 bg-cyan-100" : "bg-gray-100"}
      `}
		>
			<Text
				className={`
          text-sm
          ${selected ? "font-semibold text-cyan-700" : "text-gray-700"}
        `}
			>
				{item.label}
			</Text>
		</TouchableOpacity>
	);

	return (
		<SafeAreaView className="flex-1 bg-white">
			<View className="mb-4">
				<View className="flex-row justify-between items-center mb-2">
          <Text className="text-xl font-semibold">
            Adicione especificações:
          </Text>
          {selectedItems.length > 0 && (
            <TouchableOpacity onPress={clearAll} className="p-1">
              <MaterialIcons name="delete-sweep" size={24} color="#6B7280" />
            </TouchableOpacity>
          )}
        </View>
				<View
					className="flex-row flex-wrap rounded-lg bg-gray-100 p-2"
					style={{ minHeight: 100 }}
				>
					{selectedItems.length > 0 ? (
						selectedItems.map((item) => (
							<Tag key={item.id} item={item} selected />
						))
					) : (
						<Text className="p-4 text-gray-500">
							Clique nos itens abaixo para adicioná-los
						</Text>
					)}
				</View>
			</View>

			<View className="flex-1">
				<Text className="mb-2 text-xl font-semibold">Disponíveis</Text>
				<ScrollView
					contentContainerStyle={{ flexDirection: "row", flexWrap: "wrap" }}
				>
					{availableItems.map((item) => (
						<Tag key={item.id} item={item} />
					))}
				</ScrollView>
			</View>
		</SafeAreaView>
	);
};

export default TagSelector;
