import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Text, TouchableOpacity, View } from "react-native";
import {
	type RegisterInput,
	registerSchema,
	useSessionStore,
} from "@/entities/user";
import { Lock, Mail, User } from "@/shared/icons";
import { AppButton, AppInput } from "@/shared/ui";

export interface RegisterFormProps {
	onSuccess?: () => void;
	onLoginPress?: () => void;
}

export function RegisterForm({ onSuccess, onLoginPress }: RegisterFormProps) {
	const setSession = useSessionStore((state) => state.setSession);
	const [serverError, setServerError] = useState<string | null>(null);

	const {
		control,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<RegisterInput>({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			name: "",
			email: "",
			password: "",
			confirmPassword: "",
		},
	});

	const onSubmit = async (data: RegisterInput) => {
		try {
			setServerError(null);
			// Simulação de cadastro seguro
			await new Promise((resolve) => setTimeout(resolve, 800));

			await setSession({
				user: {
					id: `usr_${Date.now()}`,
					name: data.name,
					email: data.email,
				},
				token: "jwt_token_sample_registered",
			});

			onSuccess?.();
		} catch (error) {
			console.error("Erro no cadastro:", error);
			setServerError("Ocorreu um erro ao criar a conta. Tente novamente.");
		}
	};

	return (
		<View className="w-full gap-4">
			{serverError ? (
				<View className="p-3 bg-red-50 border border-red-200 rounded-lg">
					<Text className="text-red-600 text-sm font-medium text-center">
						{serverError}
					</Text>
				</View>
			) : null}

			<Controller
				control={control}
				name="name"
				render={({ field: { onChange, onBlur, value } }) => (
					<AppInput
						label="Nome Completo"
						placeholder="Digite seu nome completo"
						autoCapitalize="words"
						value={value}
						onChangeText={onChange}
						onBlur={onBlur}
						error={errors.name?.message}
						leftIcon={<User size={20} color="#767676" />}
					/>
				)}
			/>

			<Controller
				control={control}
				name="email"
				render={({ field: { onChange, onBlur, value } }) => (
					<AppInput
						label="E-mail"
						placeholder="Digite seu melhor e-mail"
						keyboardType="email-address"
						autoCapitalize="none"
						value={value}
						onChangeText={onChange}
						onBlur={onBlur}
						error={errors.email?.message}
						leftIcon={<Mail size={20} color="#767676" />}
					/>
				)}
			/>

			<Controller
				control={control}
				name="password"
				render={({ field: { onChange, onBlur, value } }) => (
					<AppInput
						label="Senha"
						placeholder="Crie uma senha forte"
						isPassword
						autoCapitalize="none"
						value={value}
						onChangeText={onChange}
						onBlur={onBlur}
						error={errors.password?.message}
						leftIcon={<Lock size={20} color="#767676" />}
					/>
				)}
			/>

			<Controller
				control={control}
				name="confirmPassword"
				render={({ field: { onChange, onBlur, value } }) => (
					<AppInput
						label="Confirmar Senha"
						placeholder="Digite novamente a senha"
						isPassword
						autoCapitalize="none"
						value={value}
						onChangeText={onChange}
						onBlur={onBlur}
						error={errors.confirmPassword?.message}
						leftIcon={<Lock size={20} color="#767676" />}
					/>
				)}
			/>

			<View className="pt-2">
				<AppButton
					title="Criar Conta"
					loading={isSubmitting}
					onPress={handleSubmit(onSubmit)}
				/>
			</View>

			{onLoginPress ? (
				<View className="flex-row justify-center items-center pt-2">
					<Text className="text-gray-500 text-sm">Já tem uma conta? </Text>
					<TouchableOpacity accessibilityRole="button" onPress={onLoginPress}>
						<Text className="text-blue-500 font-bold text-sm">Faça login</Text>
					</TouchableOpacity>
				</View>
			) : null}
		</View>
	);
}
