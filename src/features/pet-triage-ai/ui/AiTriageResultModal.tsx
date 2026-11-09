import { ScrollView, Text, View } from "react-native";
import {
	AlertTriangle,
	CheckCircle2,
	ShieldAlert,
	Sparkles,
} from "@/shared/icons";
import { triggerNotificationHaptic } from "@/shared/lib";
import { AdaptiveSheet, AppButton } from "@/shared/ui";
import type {
	AiUrgencyLevel,
	PetTriageAiResult,
} from "../model/petTriageAiSchema";

export interface AiTriageResultModalProps {
	visible: boolean;
	result: PetTriageAiResult | null;
	onClose: () => void;
	onApplyToForm: (result: PetTriageAiResult) => void;
}

const URGENCY_CONFIG: Record<
	AiUrgencyLevel,
	{ label: string; bg: string; text: string }
> = {
	low: {
		label: "Urgência Baixa",
		bg: "bg-green-100 border-green-300",
		text: "text-green-800",
	},
	medium: {
		label: "Urgência Moderada",
		bg: "bg-yellow-100 border-yellow-300",
		text: "text-yellow-800",
	},
	high: {
		label: "Urgência Alta",
		bg: "bg-orange-100 border-orange-300",
		text: "text-orange-800",
	},
	critical: {
		label: "Emergência Crítica",
		bg: "bg-red-100 border-red-300",
		text: "text-red-800",
	},
};

const SPECIES_LABEL: Record<PetTriageAiResult["species"], string> = {
	dog: "Cachorro",
	cat: "Gato",
	other: "Outro Animal",
};

export function AiTriageResultModal({
	visible,
	result,
	onClose,
	onApplyToForm,
}: AiTriageResultModalProps) {
	if (!result) {
		return null;
	}

	const urgency = URGENCY_CONFIG[result.urgencyLevel];
	const speciesText = SPECIES_LABEL[result.species];

	const handleApply = () => {
		triggerNotificationHaptic("success");
		onApplyToForm(result);
	};

	return (
		<AdaptiveSheet
			visible={visible}
			onClose={onClose}
			title="Diagnóstico de Triagem IA"
			closeAccessibilityLabel="Fechar análise"
			detents={[0.65, 0.95]}
			headerIcon={
				<View className="w-8 h-8 rounded-lg bg-blue-400 items-center justify-center">
					<Sparkles size={18} color="#FFFFFF" />
				</View>
			}
		>
			<ScrollView
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{ paddingVertical: 16, gap: 16 }}
			>
				{/* Resumo de Espécie, Raça e Urgência */}
				<View className="p-4 rounded-xl bg-gray-50 border border-gray-200 gap-2">
					<View className="flex-row items-center justify-between">
						<Text className="text-xs font-semibold uppercase text-gray-500">
							Identificação Estimada
						</Text>
						<View className={`px-3 py-1 rounded-full border ${urgency.bg}`}>
							<Text className={`text-xs font-bold ${urgency.text}`}>
								{urgency.label}
							</Text>
						</View>
					</View>

					<Text className="text-base font-bold text-gray-900">
						{speciesText} • {result.estimatedBreed}
					</Text>
				</View>

				{/* Características Físicas Detectadas */}
				<View className="gap-2">
					<Text className="text-sm font-bold text-gray-800">
						Características Físicas Detectadas
					</Text>
					<View className="flex-row flex-wrap gap-2">
						{result.detectedPhysicalTraits.map((trait) => (
							<View
								key={trait}
								className="px-3 py-1.5 rounded-lg bg-blue-50 border border-blue-200"
							>
								<Text className="text-xs font-medium text-blue-800">
									{trait}
								</Text>
							</View>
						))}
					</View>
				</View>

				{/* Ferimentos ou Sinais Visíveis */}
				<View className="gap-2">
					<View className="flex-row items-center gap-1.5">
						<AlertTriangle size={16} color="#FF5400" />
						<Text className="text-sm font-bold text-gray-800">
							Sinais Clínicos / Ferimentos Aparentes
						</Text>
					</View>
					{result.apparentInjuries.length > 0 ? (
						<View className="gap-1.5">
							{result.apparentInjuries.map((injury) => (
								<View
									key={injury}
									className="p-3 rounded-lg bg-orange-50 border border-orange-200"
								>
									<Text className="text-xs font-medium text-orange-900">
										• {injury}
									</Text>
								</View>
							))}
						</View>
					) : (
						<Text className="text-xs text-gray-500">
							Nenhum ferimento grave aparente identificado na imagem.
						</Text>
					)}
				</View>

				{/* Ações Recomendadas */}
				<View className="gap-2">
					<View className="flex-row items-center gap-1.5">
						<ShieldAlert size={16} color="#42A5F5" />
						<Text className="text-sm font-bold text-gray-800">
							Primeiros Socorros e Cuidados Imediatos
						</Text>
					</View>
					<View className="gap-1.5">
						{result.recommendedActions.map((action) => (
							<View
								key={action}
								className="flex-row items-start gap-2 p-2.5 rounded-lg bg-gray-50 border border-gray-200"
							>
								<CheckCircle2 size={16} color="#4CAF50" />
								<Text className="text-xs text-gray-700 flex-1">{action}</Text>
							</View>
						))}
					</View>
				</View>
			</ScrollView>

			{/* Botões de Ação */}
			<View className="pt-3 border-t border-gray-100 gap-2">
				<AppButton title="Aplicar ao Formulário" onPress={handleApply} />
				<AppButton title="Fechar" variant="outline" onPress={onClose} />
			</View>
		</AdaptiveSheet>
	);
}
