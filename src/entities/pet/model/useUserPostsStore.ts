import type { ImageSourcePropType } from "react-native";
import { create } from "zustand";
import type { PostSituation } from "../ui/PetPostCard";

export interface UserPostItem {
	id: string;
	name: string;
	type: string;
	situation: PostSituation;
	time: number;
	image?: ImageSourcePropType;
	createdAt?: string;
}

export const DEFAULT_USER_POSTS: UserPostItem[] = [
	{
		id: "usr_post_1",
		name: "Rex",
		type: "Cachorro",
		situation: "Perdido",
		time: 4,
	},
	{
		id: "usr_post_2",
		name: "Rex",
		type: "Gato",
		situation: "Abandonado",
		time: 1,
	},
	{
		id: "usr_post_3",
		name: "",
		type: "Coelho",
		situation: "Adocao",
		time: 3,
	},
];

export interface UserPostsState {
	posts: UserPostItem[];
	addPost: (
		post: Omit<UserPostItem, "id" | "time"> & { time?: number; id?: string },
	) => void;
	removePost: (id: string) => void;
	clearPosts: () => void;
	resetToDefault: () => void;
}

export const useUserPostsStore = create<UserPostsState>((set) => ({
	posts: DEFAULT_USER_POSTS,

	addPost: (post) =>
		set((state) => ({
			posts: [
				{
					id:
						post.id ||
						`post_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
					time: post.time ?? 0,
					name: post.name,
					type: post.type,
					situation: post.situation,
					image: post.image,
					createdAt: post.createdAt || new Date().toISOString(),
				},
				...state.posts,
			],
		})),

	removePost: (id) =>
		set((state) => ({
			posts: state.posts.filter((p) => p.id !== id),
		})),

	clearPosts: () => set({ posts: [] }),

	resetToDefault: () => set({ posts: DEFAULT_USER_POSTS }),
}));

export default useUserPostsStore;
