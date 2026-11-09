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
		<View className="w-full">
			<View className="w-full gap-4">
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
						className="self-end pt-1 active:opacity-70"
					>
						<Text className="font-ubuntu-medium text-[#42A5F5] text-sm text-right">
							Esqueci a senha
						</Text>
					</TouchableOpacity>
				) : (
					<Link
						href={"/(auth)/forgotPassword"}
						className="font-ubuntu-medium text-[#42A5F5] text-sm self-end pt-1 active:opacity-70"
					>
						Esqueci a senha
					</Link>
				)}
			</View>

			<View className="w-full mt-8">
				<AppButton
					text="Entrar"
					onPress={() => handleSubmit(onSubmit)()}
					disabled={isSubmitting}
				/>
			</View>
		</View>
	);
}
