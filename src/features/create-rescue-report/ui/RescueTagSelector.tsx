import { MaterialIcons } from "@expo/vector-icons";
import { useMemo, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import {
	calculateNextSelectedTags,
	DEFAULT_RESCUE_TAGS,
	type TagItem,
} from "../model/rescueTags";

export interface RescueTagSelectorProps {
	tags?: TagItem[];
	selectedIds?: string[];
	onChange?: (selectedIds: string[]) => void;
	className?: string;
}

export function RescueTagSelector({
	tags = DEFAULT_RESCUE_TAGS,
	selectedIds: controlledIds,
	onChange,
	className = "",
}: RescueTagSelectorProps) {
	const [internalSelectedIds, setInternalSelectedIds] = useState<string[]>([]);
	const isControlled = controlledIds !== undefined;
	const currentSelectedIds = isControlled ? controlledIds : internalSelectedIds;

	const toggleItem = (item: TagItem) => {
		const next = calculateNextSelectedTags(currentSelectedIds, item.id);

		if (!isControlled) {
			setInternalSelectedIds(next);
		}
		onChange?.(next);
	};

	const clearAll = () => {
		if (!isControlled) {
			setInternalSelectedIds([]);
		}
		onChange?.([]);
	};

	const { selectedItems, availableItems } = useMemo(() => {
		const selected: TagItem[] = [];
		const available: TagItem[] = [];

		tags.forEach((item) => {
			if (currentSelectedIds.includes(item.id)) {
				selected.push(item);
			} else {
				available.push(item);
			}
		});

		return { selectedItems: selected, availableItems: available };
	}, [tags, currentSelectedIds]);

	const Tag = ({
		item,
		selected = false,
	}: {
		item: TagItem;
		selected?: boolean;
	}) => (
		<TouchableOpacity
			accessibilityRole="button"
			accessibilityState={{ selected }}
			onPress={() => toggleItem(item)}
			activeOpacity={0.7}
			className={`m-1 rounded-full border border-gray-300 px-3 py-1.5 ${
				selected ? "border-cyan-500 bg-cyan-100" : "bg-gray-100"
			}`}
		>
			<Text
				className={`text-sm ${
					selected ? "font-semibold text-cyan-700" : "text-gray-700"
				}`}
			>
				{item.label}
			</Text>
		</TouchableOpacity>
	);

	return (
		<View className={`bg-white ${className}`}>
			<View className="mb-4">
				<View className="flex-row justify-between items-center mb-2">
					<Text className="text-xl font-semibold text-gray-800">
						Adicione especificações:
					</Text>
					{selectedItems.length > 0 && (
						<TouchableOpacity
							accessibilityRole="button"
							accessibilityLabel="Limpar todas as especificações"
							onPress={clearAll}
							className="p-1"
						>
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

			<View>
				<Text className="mb-2 text-xl font-semibold text-gray-800">
					Disponíveis
				</Text>
				<View className="flex-row flex-wrap">
					{availableItems.map((item) => (
						<Tag key={item.id} item={item} />
					))}
				</View>
			</View>
		</View>
	);
}

export default RescueTagSelector;
