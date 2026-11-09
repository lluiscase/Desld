import { AdaptiveSheetFallback } from "./AdaptiveSheetFallback";
import type { AdaptiveSheetProps } from "./types";

export function AdaptiveSheet(props: AdaptiveSheetProps) {
	return <AdaptiveSheetFallback {...props} />;
}
