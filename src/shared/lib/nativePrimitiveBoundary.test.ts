import { describe, expect, it, vi } from "vitest";

vi.mock("react-native", () => ({
	Platform: {
		OS: "ios",
	},
}));

vi.mock("expo-haptics", () => ({
	ImpactFeedbackStyle: {
		Light: "light",
		Medium: "medium",
		Heavy: "heavy",
	},
	NotificationFeedbackType: {
		Success: "success",
		Warning: "warning",
		Error: "error",
	},
	selectionAsync: vi.fn(async () => {}),
	impactAsync: vi.fn(async () => {}),
	notificationAsync: vi.fn(async () => {}),
}));

import { Platform } from "react-native";
import {
	triggerImpactHaptic,
	triggerNotificationHaptic,
	triggerSelectionHaptic,
} from "./haptics";
import { NativePrimitiveBoundary } from "./nativePrimitiveBoundary";

describe("Shared Lib - NativePrimitiveBoundary & Haptics", () => {
	it("deve ativar estado de erro em getDerivedStateFromError para acionar o fallback", () => {
		const nextState = NativePrimitiveBoundary.getDerivedStateFromError();
		expect(nextState).toEqual({ hasError: true });
	});

	it("deve renderizar children quando em plataforma nativa sem erros e fallback quando hasError=true", () => {
		const boundary = new NativePrimitiveBoundary({
			children: "native-node",
			fallback: "tailwind-fallback-node",
		});

		expect(boundary.render()).toBe("native-node");

		boundary.state = { hasError: true };
		expect(boundary.render()).toBe("tailwind-fallback-node");
	});

	it("deve renderizar o fallback diretamente quando Platform.OS for web", () => {
		const originalOS = Platform.OS;
		(Platform as { OS: string }).OS = "web";

		const boundary = new NativePrimitiveBoundary({
			children: "native-node",
			fallback: "tailwind-fallback-node",
		});

		expect(boundary.render()).toBe("tailwind-fallback-node");

		(Platform as { OS: string }).OS = originalOS;
	});

	it("deve executar funções de haptics sem lançar exceções tanto em nativo quanto na web", async () => {
		await expect(triggerSelectionHaptic()).resolves.toBeUndefined();
		await expect(triggerImpactHaptic("medium")).resolves.toBeUndefined();
		await expect(triggerNotificationHaptic("success")).resolves.toBeUndefined();

		const originalOS = Platform.OS;
		(Platform as { OS: string }).OS = "web";
		await expect(triggerSelectionHaptic()).resolves.toBeUndefined();
		(Platform as { OS: string }).OS = originalOS;
	});
});
