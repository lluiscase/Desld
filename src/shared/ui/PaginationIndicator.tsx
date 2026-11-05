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
		<View className={`flex-row justify-center mt-6 ${className}`}>
			{dots.map((dot) => (
				<View
					key={dot.id}
					className={`w-3 h-3 rounded-full mx-1 ${
						dot.isActive ? "bg-black" : "bg-gray-300"
					}`}
				/>
			))}
		</View>
	);
}

export default PaginationIndicator;
