import { QueryClientProvider } from "@tanstack/react-query";
import type React from "react";
import { queryClient } from "./queryClient";

export interface AppProvidersProps {
	children: React.ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
	return (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	);
}

export default AppProviders;
