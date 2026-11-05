import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "expo-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Text, TouchableOpacity, View } from "react-native";
import { type LoginInput, loginSchema, useSessionStore } from "@/entities/user";
import { AppButton, AppInput } from "@/shared/ui";

export interface LoginFormProps {
	onSuccess?: () => void;
	onForgotPasswordPress?: () => void;
	onRegisterPress?: () => void;
}

export function LoginForm({
	onSuccess,
	onForgotPasswordPress,
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
			setServerError("Email ou senha inválidos");
		}
	};

	return (
		<>
			<View>
				<Controller
					control={control}
					name="email"
					render={({ field: { onChange, value } }) => (
						<AppInput
							inputType="email"
							showLabel
							value={value}
							onChangeText={onChange}
							error={errors.email?.message}
						/>
					)}
				/>

				<Controller
					control={control}
					name="password"
					render={({ field: { onChange, value } }) => (
						<AppInput
							inputType="password"
							showLabel
							value={value}
							onChangeText={onChange}
							error={errors.password?.message || serverError || undefined}
						/>
					)}
				/>

				{onForgotPasswordPress ? (
					<TouchableOpacity
						onPress={onForgotPasswordPress}
						className="mt-2 text-end"
					>
						<Text className="text-blue-400 text-end">Esqueci a senha</Text>
					</TouchableOpacity>
				) : (
					<Link
						href={"/forgotPassword"}
						className="mt-2 text-blue-400 text-end"
					>
						Esqueci a senha
					</Link>
				)}
			</View>

			<AppButton
				text="Entrar"
				onPress={handleSubmit(onSubmit)}
				disabled={isSubmitting}
			/>
		</>
	);
}
