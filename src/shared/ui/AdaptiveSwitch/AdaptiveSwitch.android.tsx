import { Switch as ComposeSwitch, Host } from "@expo/ui/jetpack-compose";
import { NativePrimitiveBoundary, triggerSelectionHaptic } from "@/shared/lib";
import { AdaptiveSwitchFallback } from "./AdaptiveSwitchFallback";
import type { AdaptiveSwitchProps } from "./types";

function AndroidComposeSwitch({
	value,
	onValueChange,
	activeColor = "#42A5F5",
}: AdaptiveSwitchProps) {
	const handleChange = (nextValue: boolean) => {
		triggerSelectionHaptic();
		onValueChange(nextValue);
	};

	return (
		<Host matchContents>
			<ComposeSwitch
				variant="switch"
				value={value}
				onValueChange={handleChange}
				elementColors={{
					checkedTrackColor: activeColor,
					checkedThumbColor: "#FFFFFF",
					uncheckedTrackColor: "#E5E7EB",
					uncheckedThumbColor: "#79747E",
				}}
			/>
		</Host>
	);
}

export function AdaptiveSwitch(props: AdaptiveSwitchProps) {
	if (props.disabled) {
		return <AdaptiveSwitchFallback {...props} />;
	}

	return (
		<NativePrimitiveBoundary fallback={<AdaptiveSwitchFallback {...props} />}>
			<AndroidComposeSwitch {...props} />
		</NativePrimitiveBoundary>
	);
}
