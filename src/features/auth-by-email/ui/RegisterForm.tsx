import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { View } from "react-native";
import {
	type RegisterInput,
	registerSchema,
	useSessionStore,
} from "@/entities/user";
import { AppButton, AppInput } from "@/shared/ui";

export interface RegisterFormProps {
	onSuccess?: () => void;
	onLoginPress?: () => void;
}

export function RegisterForm({ onSuccess }: RegisterFormProps) {
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
			setServerError("Ocorreu um erro ao criar a conta.");
		}
	};

	return (
		<View className="w-full">
			<View className="w-full gap-4">
				<Controller
					control={control}
					name="name"
					render={({ field: { onChange, value } }) => (
						<AppInput
							inputType="name"
							showLabel
							value={value}
							onChangeText={onChange}
							error={errors.name?.message}
						/>
					)}
				/>

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
							error={errors.password?.message}
						/>
					)}
				/>

				<Controller
					control={control}
					name="confirmPassword"
					render={({ field: { onChange, value } }) => (
						<AppInput
							inputType="passwordRerun"
							showLabel
							value={value}
							onChangeText={onChange}
							error={
								errors.confirmPassword?.message || serverError || undefined
							}
						/>
					)}
				/>
			</View>

			<View className="w-full mt-8">
				<AppButton
					text="Criar conta"
					onPress={handleSubmit(onSubmit)}
					disabled={isSubmitting}
				/>
			</View>
		</View>
	);
}
