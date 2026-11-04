import { zodResolver } from "@hookform/resolvers/zod";
import type React from "react";
import { Controller, useForm } from "react-hook-form";
import {
	ScrollView,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import type { RescueStatus } from "@/entities/pet";
import { MapPin } from "@/shared/icons";
import { AppButton, AppInput } from "@/shared/ui";
import {
	type RescueReportInput,
	rescueReportSchema,
} from "../model/rescueReportSchema";
import { MediaPickerStep } from "./MediaPickerStep";

export interface AiSuggestionInput {
	title?: string;
	species?: "dog" | "cat" | "other";
	status?: RescueStatus;
	tags?: RescueReportInput["tags"];
	description?: string;
}

export interface RescueDetailsFormProps {
	initialData?: Partial<RescueReportInput>;
	onSubmitSuccess?: (data: RescueReportInput) => void;
	onCancel?: () => void;
	renderAiAssistant?: (context: {
		images: string[];
		applySuggestion: (suggestion: AiSuggestionInput) => void;
	}) => React.ReactNode;
}

const SPECIES_OPTIONS = [
	{ id: "dog", label: "Cachorro" },
	{ id: "cat", label: "Gato" },
	{ id: "other", label: "Outro" },
] as const;

const STATUS_OPTIONS: { id: RescueStatus; label: string }[] = [
	{ id: "lost", label: "Animal Perdido" },
	{ id: "street", label: "Em Situação de Rua" },
	{ id: "rescued", label: "Resgatado" },
];

export function RescueDetailsForm({
	initialData,
	onSubmitSuccess,
	onCancel,
	renderAiAssistant,
}: RescueDetailsFormProps) {
	const {
		control,
		handleSubmit,
		setValue,
		watch,
		formState: { errors, isSubmitting },
	} = useForm<RescueReportInput>({
		resolver: zodResolver(rescueReportSchema),
		defaultValues: {
			title: initialData?.title ?? "",
			species: initialData?.species ?? "dog",
			status: initialData?.status ?? "street",
			images: initialData?.images ?? [],
			description: initialData?.description ?? "",
			location: initialData?.location ?? "",
			tags: initialData?.tags ?? [],
			contactPhone: initialData?.contactPhone ?? "",
		},
	});

	const selectedSpecies = watch("species");
	const selectedStatus = watch("status");
	const selectedImages = watch("images");

	const applySuggestion = (suggestion: AiSuggestionInput) => {
		if (suggestion.title) {
			setValue("title", suggestion.title, {
				shouldValidate: true,
				shouldDirty: true,
			});
		}
		if (suggestion.species) {
			setValue("species", suggestion.species, {
				shouldValidate: true,
				shouldDirty: true,
			});
		}
		if (suggestion.status) {
			setValue("status", suggestion.status, {
				shouldValidate: true,
				shouldDirty: true,
			});
		}
		if (suggestion.tags) {
			setValue("tags", suggestion.tags, {
				shouldValidate: true,
				shouldDirty: true,
			});
		}
		if (suggestion.description) {
			setValue("description", suggestion.description, {
				shouldValidate: true,
				shouldDirty: true,
			});
		}
	};

	const onSubmit = async (data: RescueReportInput) => {
		try {
			await new Promise((resolve) => setTimeout(resolve, 800));
			onSubmitSuccess?.(data);
		} catch (error) {
			console.error("Erro ao registrar relatório de resgate:", error);
		}
	};

	return (
		<ScrollView
			className="w-full"
			showsVerticalScrollIndicator={false}
			contentContainerStyle={{ gap: 16, paddingBottom: 32 }}
		>
			{/* Mídia */}
			<MediaPickerStep
				images={selectedImages}
				onImagesChange={(uris) =>
					setValue("images", uris, { shouldValidate: true })
				}
				error={errors.images?.message}
			/>

			{/* Slot de Triagem por IA (desacoplado via Inversão de Controle FSD) */}
			{renderAiAssistant
				? renderAiAssistant({
						images: selectedImages,
						applySuggestion,
					})
				: null}

			{/* Nome / Título */}
			<Controller
				control={control}
				name="title"
				render={({ field: { onChange, onBlur, value } }) => (
					<AppInput
						label="Nome ou Identificação do Pet"
						placeholder="Ex: Rex, Cãozinho caramelo com coleira..."
						value={value}
						onChangeText={onChange}
						onBlur={onBlur}
						error={errors.title?.message}
					/>
				)}
			/>

			{/* Seleção de Espécie */}
			<View className="gap-1.5">
				<Text className="text-gray-700 font-medium text-sm">Espécie</Text>
				<View className="flex-row gap-2">
					{SPECIES_OPTIONS.map((item) => {
						const isSelected = selectedSpecies === item.id;
						return (
							<TouchableOpacity
								key={item.id}
								accessibilityRole="button"
								onPress={() =>
									setValue("species", item.id, { shouldValidate: true })
								}
								className={`flex-1 py-2.5 px-3 rounded-lg border items-center justify-center ${
									isSelected
										? "bg-blue-400 border-blue-400"
										: "bg-gray-100 border-gray-200"
								}`}
							>
								<Text
									className={`text-sm font-semibold ${
										isSelected ? "text-white" : "text-gray-700"
									}`}
								>
									{item.label}
								</Text>
							</TouchableOpacity>
						);
					})}
				</View>
				{errors.species?.message ? (
					<Text className="text-red-500 text-xs">{errors.species.message}</Text>
				) : null}
			</View>

			{/* Seleção de Situação */}
			<View className="gap-1.5">
				<Text className="text-gray-700 font-medium text-sm">
					Situação Atual
				</Text>
				<View className="flex-row gap-2">
					{STATUS_OPTIONS.map((item) => {
						const isSelected = selectedStatus === item.id;
						return (
							<TouchableOpacity
								key={item.id}
								accessibilityRole="button"
								onPress={() =>
									setValue("status", item.id, { shouldValidate: true })
								}
								className={`flex-1 py-2.5 px-2 rounded-lg border items-center justify-center ${
									isSelected
										? "bg-blue-400 border-blue-400"
										: "bg-gray-100 border-gray-200"
								}`}
							>
								<Text
									className={`text-xs text-center font-semibold ${
										isSelected ? "text-white" : "text-gray-700"
									}`}
								>
									{item.label}
								</Text>
							</TouchableOpacity>
						);
					})}
				</View>
				{errors.status?.message ? (
					<Text className="text-red-500 text-xs">{errors.status.message}</Text>
				) : null}
			</View>

			{/* Localização */}
			<Controller
				control={control}
				name="location"
				render={({ field: { onChange, onBlur, value } }) => (
					<AppInput
						label="Onde foi visto / Localização"
						placeholder="Ex: Av. Paulista, próximo ao metrô Consolação"
						value={value}
						onChangeText={onChange}
						onBlur={onBlur}
						error={errors.location?.message}
						leftIcon={<MapPin size={20} color="#767676" />}
					/>
				)}
			/>

			{/* Descrição em TextArea */}
			<View className="gap-1.5">
				<Text className="text-gray-700 font-medium text-sm">
					Descrição Detalhada
				</Text>
				<Controller
					control={control}
					name="description"
					render={({ field: { onChange, onBlur, value } }) => (
						<TextInput
							className={`w-full min-h-[100px] p-3 rounded-lg bg-gray-100 border text-base text-gray-900 ${
								errors.description ? "border-red-500" : "border-gray-200"
							}`}
							placeholder="Descreva detalhes como comportamento, ferimentos, cor da pelagem..."
							placeholderTextColor="#767676"
							multiline
							numberOfLines={4}
							textAlignVertical="top"
							value={value}
							onChangeText={onChange}
							onBlur={onBlur}
						/>
					)}
				/>
				{errors.description?.message ? (
					<Text className="text-red-500 text-xs">
						{errors.description.message}
					</Text>
				) : null}
			</View>

			{/* Ações */}
			<View className="pt-4 gap-2">
				<AppButton
					title="Publicar Alerta de Resgate"
					loading={isSubmitting}
					onPress={handleSubmit(onSubmit)}
				/>
				{onCancel ? (
					<AppButton title="Cancelar" variant="outline" onPress={onCancel} />
				) : null}
			</View>
		</ScrollView>
	);
}
