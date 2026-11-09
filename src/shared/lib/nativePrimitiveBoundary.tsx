import { Component, type ErrorInfo, type ReactNode } from "react";
import { Platform } from "react-native";

export interface NativePrimitiveBoundaryProps {
	children: ReactNode;
	fallback: ReactNode;
	onError?: (error: Error, info: ErrorInfo) => void;
}

interface NativePrimitiveBoundaryState {
	hasError: boolean;
}

/**
 * ErrorBoundary para primitivos nativos (@expo/ui SwiftUI / Jetpack Compose).
 * Garante que na Web ou em caso de ausência/falha do binário nativo (ex: Expo Go),
 * o componente faça fallback imediato e transparente para a versão React Native + Tailwind.
 */
export class NativePrimitiveBoundary extends Component<
	NativePrimitiveBoundaryProps,
	NativePrimitiveBoundaryState
> {
	override state: NativePrimitiveBoundaryState = {
		hasError: false,
	};

	static getDerivedStateFromError(): NativePrimitiveBoundaryState {
		return { hasError: true };
	}

	override componentDidCatch(error: Error, info: ErrorInfo) {
		this.props.onError?.(error, info);
	}

	override render() {
		if (Platform.OS === "web" || this.state.hasError) {
			return this.props.fallback;
		}

		return this.props.children;
	}
}
