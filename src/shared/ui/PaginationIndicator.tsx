import { View } from "react-native";

export interface PaginationIndicatorProps {
	position: number;
	totalSlides?: number;
	className?: string;
}

export function PaginationIndicator({
	position,
	totalSlides = 5,
	className = "",
}: PaginationIndicatorProps) {
	const dots = Array.from({ length: totalSlides }, (_, index) => ({
		id: `slide-dot-item-${index}`,
		isActive: index === position,
	}));

	return (
		<View className={`flex-row items-center justify-center ${className}`}>
			{dots.map((dot) => (
				<View
					key={dot.id}
					className={`h-2 rounded-full mx-1 ${
						dot.isActive ? "w-6 bg-[#42A5F5]" : "w-2 bg-gray-300"
					}`}
				/>
			))}
		</View>
	);
}

export default PaginationIndicator;
