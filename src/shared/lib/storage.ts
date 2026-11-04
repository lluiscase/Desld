import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

export interface StorageAdapter {
	getItem(key: string): Promise<string | null>;
	setItem(key: string, value: string): Promise<void>;
	removeItem(key: string): Promise<void>;
}

class MemoryStorage implements StorageAdapter {
	private storage = new Map<string, string>();

	async getItem(key: string): Promise<string | null> {
		return this.storage.get(key) ?? null;
	}

	async setItem(key: string, value: string): Promise<void> {
		this.storage.set(key, value);
	}

	async removeItem(key: string): Promise<void> {
		this.storage.delete(key);
	}
}

class SecureStorage implements StorageAdapter {
	private memoryFallback = new MemoryStorage();

	async getItem(key: string): Promise<string | null> {
		try {
			if (Platform.OS === "web") {
				return this.memoryFallback.getItem(key);
			}
			const isAvailable = await SecureStore.isAvailableAsync();
			if (!isAvailable) {
				return this.memoryFallback.getItem(key);
			}
			return await SecureStore.getItemAsync(key);
		} catch {
			return this.memoryFallback.getItem(key);
		}
	}

	async setItem(key: string, value: string): Promise<void> {
		try {
			if (Platform.OS === "web") {
				await this.memoryFallback.setItem(key, value);
				return;
			}
			const isAvailable = await SecureStore.isAvailableAsync();
			if (!isAvailable) {
				await this.memoryFallback.setItem(key, value);
				return;
			}
			await SecureStore.setItemAsync(key, value);
		} catch {
			await this.memoryFallback.setItem(key, value);
		}
	}

	async removeItem(key: string): Promise<void> {
		try {
			if (Platform.OS === "web") {
				await this.memoryFallback.removeItem(key);
				return;
			}
			const isAvailable = await SecureStore.isAvailableAsync();
			if (!isAvailable) {
				await this.memoryFallback.removeItem(key);
				return;
			}
			await SecureStore.deleteItemAsync(key);
		} catch {
			await this.memoryFallback.removeItem(key);
		}
	}
}

export const appStorage: StorageAdapter = new SecureStorage();
