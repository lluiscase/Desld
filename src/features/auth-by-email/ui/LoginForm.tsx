import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Text, TouchableOpacity, View } from "react-native";
import { type LoginInput, loginSchema, useSessionStore } from "@/entities/user";
import { Lock, Mail } from "@/shared/icons";
import { AppButton, AppInput } from "@/shared/ui";

export interface LoginFormProps {
	onSuccess?: () => void;
	onForgotPasswordPress?: () => void;
	onRegisterPress?: () => void;
}

export function LoginForm({
	onSuccess,
	onForgotPasswordPress,
	onRegisterPress,
}: LoginFormProps) {
	const setSession = useSessionStore((state) => state.setSession);
	const [serverError, setServerError] = useState<string | null>(null);

	const {
		control,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<LoginInput>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit = async (data: LoginInput) => {
		try {
			setServerError(null);
			// Simulação de autenticação com a store segura
			await new Promise((resolve) => setTimeout(resolve, 800));

			await setSession({
				user: {
					id: "usr_mock_123",
					name: "Usuário AuHelp",
					email: data.email,
				},
				token: "jwt_token_sample_abc123",
			});

			onSuccess?.();
		} catch (error) {
			console.error("Erro no login:", error);
			setServerError("E-mail ou senha inválidos. Tente novamente.");
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
				name="email"
				render={({ field: { onChange, onBlur, value } }) => (
					<AppInput
						label="E-mail"
						placeholder="Digite seu e-mail"
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
						placeholder="Digite sua senha"
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

			{onForgotPasswordPress ? (
				<TouchableOpacity
					accessibilityRole="button"
					onPress={onForgotPasswordPress}
					className="self-end pt-1"
				>
					<Text className="text-blue-500 font-medium text-sm">
						Esqueceu a senha?
					</Text>
				</TouchableOpacity>
			) : null}

			<View className="pt-2">
				<AppButton
					title="Entrar"
					loading={isSubmitting}
					onPress={handleSubmit(onSubmit)}
				/>
			</View>

			{onRegisterPress ? (
				<View className="flex-row justify-center items-center pt-2">
					<Text className="text-gray-500 text-sm">Não tem uma conta? </Text>
					<TouchableOpacity
						accessibilityRole="button"
						onPress={onRegisterPress}
					>
						<Text className="text-blue-500 font-bold text-sm">Cadastre-se</Text>
					</TouchableOpacity>
				</View>
			) : null}
		</View>
	);
}
