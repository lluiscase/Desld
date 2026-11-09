import { Host, Switch as SwiftUISwitch } from "@expo/ui/swift-ui";
import { NativePrimitiveBoundary, triggerSelectionHaptic } from "@/shared/lib";
import { AdaptiveSwitchFallback } from "./AdaptiveSwitchFallback";
import type { AdaptiveSwitchProps } from "./types";

function IOSSwiftUISwitch({
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
			<SwiftUISwitch
				variant="switch"
				value={value}
				color={activeColor}
				onValueChange={handleChange}
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
			<IOSSwiftUISwitch {...props} />
		</NativePrimitiveBoundary>
	);
}
