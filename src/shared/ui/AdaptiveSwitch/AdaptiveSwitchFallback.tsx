import { Platform, Switch } from "react-native";
import { triggerSelectionHaptic } from "@/shared/lib";
import type { AdaptiveSwitchProps } from "./types";

export function AdaptiveSwitchFallback({
	value,
	onValueChange,
	activeColor = "#42A5F5",
	accessibilityLabel,
	disabled = false,
}: AdaptiveSwitchProps) {
	const handleChange = (nextValue: boolean) => {
		triggerSelectionHaptic();
		onValueChange(nextValue);
	};

	return (
		<Switch
			accessibilityLabel={accessibilityLabel}
			disabled={disabled}
			value={value}
			onValueChange={handleChange}
			trackColor={{ false: "#D1D5DB", true: activeColor }}
			thumbColor={
				Platform.OS === "android" ? (value ? "#FFFFFF" : "#F3F4F6") : undefined
			}
			ios_backgroundColor="#D1D5DB"
		/>
	);
}
