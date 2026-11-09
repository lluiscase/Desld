import { AdaptiveSwitchFallback } from "./AdaptiveSwitchFallback";
import type { AdaptiveSwitchProps } from "./types";

export function AdaptiveSwitch(props: AdaptiveSwitchProps) {
	return <AdaptiveSwitchFallback {...props} />;
}
