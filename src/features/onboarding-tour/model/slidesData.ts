import dogandgirl from "../../../../assets/dogandgirl.png";
import dogSad from "../../../../assets/dogSad.png";
import shareLocation from "../../../../assets/shareLocation.png";
import womanCard from "../../../../assets/womanCard.png";
import womanSunshade from "../../../../assets/womanSunshade.png";
import type { OnboardingSlide } from "./types";

export const ONBOARDING_SLIDES: readonly OnboardingSlide[] = [
	{
		id: "step1",
		title: "AuHelp te ajuda a resgatar animais no conforto de sua casa.",
		image: dogandgirl,
		imageAlt: "Garota com cachorro no colo",
	},
	{
		id: "step2",
		title: " animais em risco com apenas um clique.",
		titleHighlight: {
			text: "Reporte",
			colorClassName: "text-red-500",
		},
		image: womanCard,
		imageAlt: "Mulher com smartphone reportando animal",
	},
	{
		id: "step3",
		title: "Dê um novo lar para um animalzinho sem moradia.",
		image: dogSad,
		imageAlt: "Cachorro que precisa de novo lar",
	},
	{
		id: "step4",
		title: "Anuncie a doação e ajude um pet a achar um lar.",
		image: womanSunshade,
		imageAlt: "Mulher anunciando doação de pet",
	},
	{
		id: "step5",
		title: "Compartilhe sua localização e ajude.",
		image: shareLocation,
		imageAlt: "Localização compartilhada para resgate",
	},
];
