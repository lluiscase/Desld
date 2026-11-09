import type { ReactNode } from "react";

export interface AdaptiveSheetProps {
	/** Controla se o sheet está visível */
	visible: boolean;
	/** Callback disparado ao fechar o sheet (gesto de swipe, backdrop ou botão) */
	onClose: () => void;
	/** Título opcional exibido no cabeçalho do sheet */
	title?: string;
	/** Ícone ou elemento decorativo opcional à esquerda do título */
	headerIcon?: ReactNode;
	/** Snap points (detents) entre 0 e 1 para sheets nativos (ex: [0.6, 0.95]) */
	detents?: number[];
	/** Exibe a barra indicadora de arraste (grabber/drag handle) */
	showGrabber?: boolean;
	/** Rótulo de acessibilidade para o botão de fechar */
	closeAccessibilityLabel?: string;
	/** Conteúdo interno React Native / Tailwind */
	children: ReactNode;
}
