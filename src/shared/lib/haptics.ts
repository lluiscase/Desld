import * as Haptics from "expo-haptics";
import { Platform } from "react-native";

export type HapticImpactStyle = "light" | "medium" | "heavy";
export type HapticNotificationType = "success" | "warning" | "error";

const IMPACT_MAP: Record<HapticImpactStyle, Haptics.ImpactFeedbackStyle> = {
	light: Haptics.ImpactFeedbackStyle.Light,
	medium: Haptics.ImpactFeedbackStyle.Medium,
	heavy: Haptics.ImpactFeedbackStyle.Heavy,
};

const NOTIFICATION_MAP: Record<
	HapticNotificationType,
	Haptics.NotificationFeedbackType
> = {
	success: Haptics.NotificationFeedbackType.Success,
	warning: Haptics.NotificationFeedbackType.Warning,
	error: Haptics.NotificationFeedbackType.Error,
};

/**
 * Aciona feedback tátil sutil de seleção (iOS UISelectionFeedbackGenerator / Android clock tick).
 * Na Web ou em dispositivos sem motor tátil, executa no-op silenciosamente.
 */
export async function triggerSelectionHaptic(): Promise<void> {
	if (Platform.OS === "web") {
		return;
	}
	try {
		await Haptics.selectionAsync();
	} catch {
		// Ignora silenciosamente caso o hardware/simulador não suporte haptics
	}
}

/**
 * Aciona feedback tátil físico de impacto (leve, médio ou forte).
 */
export async function triggerImpactHaptic(
	style: HapticImpactStyle = "light",
): Promise<void> {
	if (Platform.OS === "web") {
		return;
	}
	try {
		await Haptics.impactAsync(IMPACT_MAP[style]);
	} catch {
		// Ignora silenciosamente
	}
}

/**
 * Aciona feedback tátil semântico de notificação (sucesso, alerta ou erro).
 */
export async function triggerNotificationHaptic(
	type: HapticNotificationType = "success",
): Promise<void> {
	if (Platform.OS === "web") {
		return;
	}
	try {
		await Haptics.notificationAsync(NOTIFICATION_MAP[type]);
	} catch {
		// Ignora silenciosamente
	}
}
