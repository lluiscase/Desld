import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { Check } from "@/shared/icons";

export interface TagItem {
	id: string;
	label: string;
}

export const DEFAULT_FILTER_TAGS: TagItem[] = [
	{ id: "dog", label: "Cachorro" },
	{ id: "cat", label: "Gato" },
	{ id: "lost", label: "Perdido" },
	{ id: "street", label: "Na Rua" },
	{ id: "urgent", label: "Urgente" },
	{ id: "injured", label: "Machucado" },
	{ id: "castrado", label: "Castrado" },
	{ id: "vacinado", label: "Vacinado" },
];

export interface TagFilterListProps {
	tags?: TagItem[];
	selectedTags?: string[];
	onTagToggle?: (tagId: string, updatedTags: string[]) => void;
	multiSelect?: boolean;
	className?: string;
}

export function TagFilterList({
	tags = DEFAULT_FILTER_TAGS,
	selectedTags = [],
	onTagToggle,
	multiSelect = true,
	className = "",
}: TagFilterListProps) {
	const handlePress = (tagId: string) => {
		if (!onTagToggle) return;

		let updated: string[];
		if (multiSelect) {
			if (selectedTags.includes(tagId)) {
				updated = selectedTags.filter((id) => id !== tagId);
			} else {
				updated = [...selectedTags, tagId];
			}
		} else {
			updated = selectedTags.includes(tagId) ? [] : [tagId];
		}

		onTagToggle(tagId, updated);
	};

	return (
		<View className={`w-full py-2 ${className}`}>
			<ScrollView
				horizontal
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={{ paddingHorizontal: 4, gap: 8 }}
			>
				{tags.map((tag) => {
					const isSelected = selectedTags.includes(tag.id);

					return (
						<TouchableOpacity
							key={tag.id}
							accessibilityRole="checkbox"
							accessibilityState={{ checked: isSelected }}
							activeOpacity={0.7}
							onPress={() => handlePress(tag.id)}
							className={`flex-row items-center px-3.5 py-1.5 rounded-full border transition-colors ${
								isSelected
									? "bg-blue-400 border-blue-400"
									: "bg-gray-100 border-gray-200"
							}`}
						>
							{isSelected ? (
								<View className="mr-1.5">
									<Check size={14} color="#FFFFFF" />
								</View>
							) : null}
							<Text
								className={`text-xs font-semibold ${
									isSelected ? "text-white" : "text-gray-700"
								}`}
							>
								{tag.label}
							</Text>
						</TouchableOpacity>
					);
				})}
			</ScrollView>
		</View>
	);
}
