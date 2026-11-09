import { Link, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useCallback, useRef, useState } from "react";
import {
	type FlatList,
	type NativeScrollEvent,
	type NativeSyntheticEvent,
	useWindowDimensions,
	View,
} from "react-native";
import Animated, {
	useAnimatedScrollHandler,
	useSharedValue,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
	triggerImpactHaptic,
	triggerNotificationHaptic,
	triggerSelectionHaptic,
} from "@/shared/lib";
import { AppButton as Button } from "@/shared/ui";
import { ONBOARDING_SLIDES } from "../model/slidesData";
import type { OnboardingSlide } from "../model/types";
import { AnimatedPagination } from "./AnimatedPagination";
import { OnboardingSlideItem } from "./OnboardingSlideItem";

export function OnboardingTour() {
	const { width: windowWidth } = useWindowDimensions();
	const insets = useSafeAreaInsets();
	const router = useRouter();
	const flatListRef = useRef<FlatList<OnboardingSlide>>(null);
	const isAnimatingRef = useRef(false);

	const scrollX = useSharedValue(0);
	const [currentIndex, setCurrentIndex] = useState(0);

	const topPadding = insets.top > 0 ? insets.top + 8 : 16;
	const bottomPadding = insets.bottom > 0 ? insets.bottom + 16 : 24;

	const scrollHandler = useAnimatedScrollHandler({
		onScroll: (event) => {
			if (!isAnimatingRef.current) {
				scrollX.value = event.contentOffset.x;
			}
		},
	});

	const handleMomentumScrollEnd = useCallback(
		(event: NativeSyntheticEvent<NativeScrollEvent>) => {
			if (isAnimatingRef.current) return;
			const newIndex = Math.round(
				event.nativeEvent.contentOffset.x / windowWidth,
			);
			if (
				newIndex >= 0 &&
				newIndex < ONBOARDING_SLIDES.length &&
				newIndex !== currentIndex
			) {
				setCurrentIndex(newIndex);
				triggerSelectionHaptic();
			}
		},
		[windowWidth, currentIndex],
	);

	/**
	 * Animação suave e cronometrada (400ms) de transição entre slides ao clicar em 'Próximo' ou nos dots.
	 * Utiliza interpolação cúbica in-out com requestAnimationFrame na UI para uma experiência fluida.
	 */
	const smoothScrollTo = useCallback(
		(targetIndex: number, durationMs = 400) => {
			if (
				targetIndex < 0 ||
				targetIndex >= ONBOARDING_SLIDES.length ||
				isAnimatingRef.current
			) {
				return;
			}

			const startOffset = scrollX.value;
			const targetOffset = targetIndex * windowWidth;
			const distance = targetOffset - startOffset;

			if (Math.abs(distance) < 1) {
				setCurrentIndex(targetIndex);
				return;
			}

			isAnimatingRef.current = true;
			const startTime = Date.now();

			const easeInOutCubic = (t: number) =>
				t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2;

			const animateFrame = () => {
				const elapsed = Date.now() - startTime;
				const progress = Math.min(elapsed / durationMs, 1);
				const eased = easeInOutCubic(progress);
				const currentOffset = startOffset + distance * eased;

				flatListRef.current?.scrollToOffset({
					offset: currentOffset,
					animated: false,
				});
				scrollX.value = currentOffset;

				if (progress < 1) {
					requestAnimationFrame(animateFrame);
				} else {
					flatListRef.current?.scrollToOffset({
						offset: targetOffset,
						animated: false,
					});
					scrollX.value = targetOffset;
					setCurrentIndex(targetIndex);
					isAnimatingRef.current = false;
				}
			};

			requestAnimationFrame(animateFrame);
		},
		[windowWidth, scrollX],
	);

	const handleNext = useCallback(() => {
		if (currentIndex < ONBOARDING_SLIDES.length - 1) {
			triggerImpactHaptic("light");
			smoothScrollTo(currentIndex + 1, 400);
		} else {
			triggerNotificationHaptic("success");
			router.push("/initial");
		}
	}, [currentIndex, smoothScrollTo, router]);

	const handleDotPress = useCallback(
		(index: number) => {
			triggerImpactHaptic("light");
			smoothScrollTo(index, 400);
		},
		[smoothScrollTo],
	);

	const isLastSlide = currentIndex === ONBOARDING_SLIDES.length - 1;

	return (
		<View className="flex-1 bg-white">
			{/* Carrossel Horizontal Contínuo com Gestos */}
			<View style={{ paddingTop: topPadding }} className="flex-1">
				<Animated.FlatList
					ref={flatListRef}
					data={ONBOARDING_SLIDES}
					keyExtractor={(item) => item.id}
					renderItem={({ item }) => (
						<OnboardingSlideItem item={item} width={windowWidth} />
					)}
					horizontal
					pagingEnabled
					showsHorizontalScrollIndicator={false}
					bounces={false}
					onScroll={scrollHandler}
					scrollEventThrottle={16}
					onMomentumScrollEnd={handleMomentumScrollEnd}
					contentContainerStyle={{ flexGrow: 1, height: "100%" }}
					style={{ flex: 1 }}
					getItemLayout={(_, index) => ({
						length: windowWidth,
						offset: windowWidth * index,
						index,
					})}
					initialNumToRender={2}
					maxToRenderPerBatch={2}
					windowSize={3}
				/>
			</View>

			{/* Rodapé com Botão, Indicadores e Pular Tour */}
			<View
				style={{ paddingBottom: bottomPadding }}
				className="flex-col items-center justify-center gap-3 px-4 pt-2"
			>
				<Button
					text={isLastSlide ? "Começar" : "Próximo"}
					onPress={handleNext}
				/>
				<AnimatedPagination
					total={ONBOARDING_SLIDES.length}
					scrollX={scrollX}
					itemWidth={windowWidth}
					onDotPress={handleDotPress}
				/>
				<Link
					className="font-ubuntu-medium text-center text-gray-500 py-1.5 active:opacity-70"
					href="/initial"
				>
					Pular tour
				</Link>
			</View>

			<StatusBar style="dark" />
		</View>
	);
}

export default OnboardingTour;
