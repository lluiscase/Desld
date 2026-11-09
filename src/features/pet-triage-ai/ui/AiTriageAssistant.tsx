import { useState } from "react";
import { View } from "react-native";
import { analyzePetImageWithAi } from "../api/triagePetService";
import {
	type MappedRescueFormSuggestion,
	mapAiResultToFormValues,
	type PetTriageAiResult,
} from "../model/petTriageAiSchema";
import { AiTriageButton } from "./AiTriageButton";
import { AiTriageResultModal } from "./AiTriageResultModal";

export interface AiTriageAssistantProps {
	imageUri?: string;
	onApplySuggestion: (suggestion: MappedRescueFormSuggestion) => void;
}

export function AiTriageAssistant({
	imageUri,
	onApplySuggestion,
}: AiTriageAssistantProps) {
	const [isAnalyzing, setIsAnalyzing] = useState(false);
	const [result, setResult] = useState<PetTriageAiResult | null>(null);
	const [isModalVisible, setIsModalVisible] = useState(false);

	const handleRunTriage = async () => {
		try {
			setIsAnalyzing(true);
			const targetUri = imageUri || "demo://rescue_dog_sample.jpg";
			const aiDiagnosis = await analyzePetImageWithAi(targetUri);
			setResult(aiDiagnosis);
			setIsModalVisible(true);
		} catch (error) {
			console.error("Falha na triagem por IA:", error);
		} finally {
			setIsAnalyzing(false);
		}
	};

	const handleApply = (aiResult: PetTriageAiResult) => {
		const mapped = mapAiResultToFormValues(aiResult);
		onApplySuggestion(mapped);
		setIsModalVisible(false);
	};

	return (
		<View className="w-full">
			<AiTriageButton
				onPress={handleRunTriage}
				isAnalyzing={isAnalyzing}
				helperText={
					imageUri
						? "Foto pronta para análise automática via IA"
						: "Toque para testar a triagem assistida por IA"
				}
			/>

			<AiTriageResultModal
				visible={isModalVisible}
				result={result}
				onClose={() => setIsModalVisible(false)}
				onApplyToForm={handleApply}
			/>
		</View>
	);
}
