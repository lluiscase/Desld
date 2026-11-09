export interface AdaptiveSwitchProps {
	/** Estado atual do switch */
	value: boolean;
	/** Callback acionado ao alternar o estado */
	onValueChange: (value: boolean) => void;
	/** Cor de destaque quando ativo (padrão AuHelp: #42A5F5) */
	activeColor?: string;
	/** Rótulo de acessibilidade para leitores de tela */
	accessibilityLabel?: string;
	/** Desabilita a interação */
	disabled?: boolean;
}
